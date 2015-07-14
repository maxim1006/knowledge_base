/*globals jQuery:false, tooltip:false */
(function($, tooltip) {
    $.fn.jstip = function(options) {
        tooltip.init(options);
        return this.each(function() {
            tooltip.wire(this);
        });
    };
}(jQuery, tooltip));
