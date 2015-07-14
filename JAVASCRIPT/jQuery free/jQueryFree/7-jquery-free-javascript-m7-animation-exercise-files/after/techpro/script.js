/*jslint white: true, nomen: true */
/*global document:false, window:false, blog:false, _:false, postal:false */
(function(blog, undefined) {
    "use strict";

    blog.posts = [];
    blog.categories = [];
    blog.channel = postal.channel();

    blog.init = function() {
        blog.getPosts();

        blog.channel.subscribe("postsUpdated", blog.setPosts);
        blog.channel.subscribe("postsUpdated", blog.displayList);

        blog.channel.subscribe("postsDisplayed", blog.setDefault);
        blog.channel.subscribe("postsDisplayed", blog.setTransitionEnd);
        blog.channel.subscribe("postsFiltered", blog.setDefault);

        document.querySelector(".list-group")
            .addEventListener("click", blog.changePost);
        document.querySelector(".btn-group")
            .addEventListener("change", blog.changeFilter);
    };

    blog.getPosts = function() {
        var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent("select * from rss where url='http://tech.pro/rss/blogs'") + '&format=json&callback=blog.jsonCallback',
            script = document.createElement("script");

        script.src = url;
        document.head.appendChild(script);
    };

    blog.jsonCallback = function(data) {
        var posts = data.query.results.item;

        posts = posts.map(function(post) {
            post.categories = post.category.join(", ");
            return post;
        });

        blog.channel.publish("postsUpdated", posts);
    };

    blog.setPosts = function(posts) {
        blog.posts = posts;
    };

    blog.displayList = function(posts) {
        var template = _.template(document.getElementById("blog-post").innerHTML),
            html = "";

        posts = posts || blog.posts;
        posts.forEach(function(post) {
            html += template({ post: post });
        });
        document.querySelector(".list-group").innerHTML = html;

        blog.channel.publish("postsDisplayed", posts);
    };

    blog.setDefault = function() {
        var active = document.querySelectorAll(".list-group-item.active:not(.fade-out)");
        if (!active.length) {
            active = document.querySelector(".list-group-item:not(.fade-out)");
            blog.setActive(active);
            blog.displayDetail(active.href);
        }
    };

    blog.setActive = function(element) {
        var nodes = document.querySelectorAll(".list-group-item.active");
        [].forEach.call(nodes, function(node) {
            node.classList.remove("active");
        });
        element.classList.add("active");
    };

    blog.changePost = function(e) {
        var post = e.target.closest("a", this);

        if (post) {
            e.preventDefault();
            blog.setActive(post);
            blog.displayDetail(post.href);
        }
    };

    blog.changeFilter = function(e) {
        var nodes = [];

        if (e.target.matches("input")) {
            nodes = this.querySelectorAll("input");

            blog.categories = [].map.call(nodes, function(node) {
                return node.checked ?
                    node.getAttribute("data-category") : null;
            }).filter(function(node) { return !!node; });

            blog.filterList(blog.categories);
        }
    };

    blog.filterList = function(categories) {
        var nodes = document.querySelectorAll(".list-group-item");

        categories = categories || blog.categories;

        [].forEach.call(nodes, function(node) {
            var found = !categories.length;

            if (!found) {
                found = categories.some(function(category) {
                    var tags = JSON.parse(node.dataset.categories);
                    return !!~tags.indexOf(category);
                });
            }

            if (found) {
                node.classList.remove("fade-out");
            } else {
                node.classList.add("fade-out");
                if (!("transition" in document.body.style)) {
                    node.classList.add("byebye");
                }
            }
        });

        blog.channel.publish("postsFiltered");
    };

    blog.setTransitionEnd = function() {
        var nodes = document.querySelectorAll(".list-group-item");
        [].forEach.call(nodes, function(node) {
            node.addEventListener("transitionend", function() {
                node.classList.add("byebye");
            });
        });
    };

    blog.displayDetail = function(url) {
        var post = blog.posts.filter(function(post) {
            return post.link === url;
        })[0];

        document.querySelector(".panel-title").innerHTML = post.title;
        document.querySelector(".panel-body").innerHTML = post.description;
    };
}(window.blog = window.blog || {}));

blog.init();
