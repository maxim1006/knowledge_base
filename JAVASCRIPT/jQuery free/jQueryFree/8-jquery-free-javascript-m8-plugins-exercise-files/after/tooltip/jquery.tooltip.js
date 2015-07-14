/*globals jQuery:false */
(function($) {
    $.fn.tooltip = function(options) {
        var $tooltip;

        options = $.extend({}, $.fn.tooltip.defaults, options);

        init(options);
        return this.each(function() {
            wire(this);
        });

        function init(options) {
            $tooltip = $("#tooltip");
            if (!$tooltip.length) {
                $tooltip = $("<div id='tooltip'>Default Text</div>").appendTo("body");
                $tooltip.css(options);
            }
        }

        function wire(element) {
            $(element).on("mouseenter", function() {
                var $this = $(this),
                    position = $(this).position();

                $tooltip
                    .text($this.attr("title"))
                    .css({
                        top: position.top - $tooltip.outerHeight(),
                        left: position.left
                    });
            }).on("mouseleave", function() {
                $tooltip.css({ left: "-99999px" });
            });
        }
    };
    $.fn.tooltip.defaults = {
        color: "#000000",
        backgroundColor: "papayawhip"
    };
}(jQuery));



