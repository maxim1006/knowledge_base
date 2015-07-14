/*globals document:false, window:false */
(function(tooltip, undefined) {
    tooltip.element = null;

    tooltip.init = function(options) {
        if (!tooltip.element) {
            tooltip.element = document.createElement("div");
            tooltip.element.id = "tooltip";
            tooltip.element.innerText = "Default Text";
            document.body.appendChild(tooltip.element);
        }

        options = options || {};
        tooltip.element.style.backgroundColor = options.backgroundColor || tooltip.defaults.backgroundColor;
        tooltip.element.style.color = options.color || tooltip.defaults.color;
    };

    tooltip.wire = function(element) {
        element.addEventListener("mouseenter", function() {
            tooltip.element.innerText = element.title;
            tooltip.element.style.top = element.offsetTop - tooltip.element.offsetHeight + "px";
            tooltip.element.style.left = element.offsetLeft + "px";
        });
        element.addEventListener("mouseleave", function() {
            tooltip.element.style.left = "-99999px";
        });
    };

    tooltip.defaults = {
        color: "#000000",
        backgroundColor: "papayawhip"
    };
}(window.tooltip = window.tooltip || {}));
