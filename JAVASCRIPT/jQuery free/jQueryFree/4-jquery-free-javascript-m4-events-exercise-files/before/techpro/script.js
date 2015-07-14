/*jslint es5: true, white: true, nomen: true */
/*global document:false, window:false, jQuery:false, blog:false, _:false */
(function(blog, $, undefined) {
    "use strict";

    blog.posts = [];
    blog.categories = [];
    blog.channel = $(document); //TODO

    blog.init = function() { //TODO
        blog.getPosts();

        blog.channel.on("postsUpdated", blog.setPosts);
        blog.channel.on("postsUpdated", blog.displayList);

        blog.channel.on("postsDisplayed", blog.setDefault);
        blog.channel.on("postsFiltered", blog.setDefault);

        $(".list-group").on("click", "a", blog.changePost);
        $(".btn-group").on("change", "input", blog.changeFilter);
    };

    blog.getPosts = function(callback) {
        var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent("select * from rss where url='http://tech.pro/rss/blogs'") + '&format=json&callback=?';

        $.getJSON(url, function(data) {
            var posts = data.query.results.item;

            posts = $.map(posts, function(post) {
                post.categories = post.category.join(", ");
                return post;
            });

            blog.channel.trigger("postsUpdated", [posts]); //TODO

            if (callback) { callback(posts); }
        });
    };

    blog.setPosts = function(e, posts) {
        blog.posts = posts;
    };

    blog.displayList = function(e, posts) {
        var template = _.template(document.getElementById("blog-post").innerHTML),
            html = "";

        posts = posts || blog.posts;
        $.each(posts, function(_, post) {
            html += template({ post: post });
        });
        document.querySelector(".list-group").innerHTML = html;

        blog.channel.trigger("postsDisplayed", [posts]); //TODO
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
        var post = this;

        e.preventDefault();
        blog.setActive(post);

        blog.displayDetail(post.href);
    };

    blog.changeFilter = function() {
        var $group = $(this).closest(".btn-group"),
            $inputs = $group.find("input");

        blog.categories = $inputs.map(function() {
            return $(this).is(":checked") ?
                $(this).data("category") : null;
        }).get();

        blog.filterList(blog.categories);
    };

    blog.filterList = function(categories) {
        var nodes = document.querySelectorAll(".list-group-item");

        categories = categories || blog.categories;

        [].forEach.call(nodes, function(node) {
            var found = !categories.length,
                $this = $(node);

            if (!found) {
                $.each(categories, function(i, category) {
                    var tags = $this.data("categories");
                    if (~$.inArray(category, tags)) {
                        found = true;
                        return false;
                    }
                });
            }

            if (found) {
                $this.removeClass("fade-out").fadeIn();
            } else {
                $this.addClass("fade-out").fadeOut();
            }
        });

        blog.channel.trigger("postsFiltered"); //TODO
    };

    blog.displayDetail = function(url) {
        var post = $.grep(blog.posts, function(post) {
            return post.link === url;
        })[0];

        document.querySelector(".panel-title").innerHTML = post.title;
        document.querySelector(".panel-body").innerHTML = post.description;
    };
}(window.blog = window.blog || {}, jQuery));

blog.init();
