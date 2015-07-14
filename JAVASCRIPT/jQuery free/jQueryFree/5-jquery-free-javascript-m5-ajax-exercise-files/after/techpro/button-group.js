/*globals document:false */
(function() {
    "use strict";

    var groups = document.querySelectorAll("[data-toggle='buttons']");
    [].forEach.call(groups, function(group) {
        group.addEventListener("click", function(e) {
            if (e.target.matches(".btn")) {
                e.target.classList.toggle("active");
            }
        });
    });
}());
