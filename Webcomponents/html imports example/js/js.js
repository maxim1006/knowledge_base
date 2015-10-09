(function($, undefined) {

    $.fn.checkPhone = function(options) {
        var defaults = {
            modeRegexp: false
        },
        $this = $(this);
        
        options = $.extend({}, defaults, options);

        //without RegExp
        !options.modeRegexp && (function() {
            $this
                .on('keydown', function(e) {
                    var $this = $(this),
                    value = $this.val(),
                    valueLength = value.length,
                    which = e.which;

                    //allow symbols
                    if (allowSymbols(e)) {
                        return;
                    //constrain all but numbers
                    } else if (valueLength >= 13 || e.shiftKey || (which < 48 || which > 57) && (which < 96 || which > 105 )) {
                        e.preventDefault();
                    } else {//add spaces
                        if (valueLength === 3 || valueLength === 7 || valueLength === 10) {
                            value = value + ' ';
                        }
                        $this.val(value);
                    }
                })
                .on('focus', onFocus)
                .on('blur', onBlur)
                .on('mousedown contextmenu', function(e) {
                    if (event.which !== 1) {
                        return false;
                    }
                });
        })();

        /*with regexp*/
        options.modeRegexp && (function() {
            $this
                .on('keyup keydown', function(e) {

                    e.ctrlKey && e.preventDefault();

                    if (allowSymbols(e)) return;
                             
                    var $this = $(this),
                    value,
                    newValue;


                    value = $this.val();
                    valLength = value.length;

                    newValue = checkForNumber(value);
                    $this.val(newValue);

                })
                .on('focus', onFocus)
                .on('blur', onBlur)
                .on('mousedown contextmenu', function(e) {
                    if (event.which !== 1) {
                        return false;
                    }
                });
        })();

    };

    $.fn.checkName = function(options) {
        var defaults = {},
        $this = $(this);
        
        options = $.extend({}, defaults, options);

        /*with regexp*/
        $this
            .on('keyup keydown', function(e) {

                e.ctrlKey && e.preventDefault();

                //allow space
                if (allowSymbols(e) || e.which === 32) return;
                         
                var $this = $(this);

                $this.val( $this.val().replace(/[^a-zA-Z\s]/g,''));

            })
            .on('mousedown contextmenu', function(e) {
                if (event.which !== 1) {
                    return false;
                }
            });

    };

    /*Helpers*/
    function onFocus() {
        var $this = $(this);
        if ($this.val() === 'xxx xxx xx xx') $this.val('');
    }

    function onBlur() {
        var $this = $(this);
        if ($this.val() === '') $this.val('xxx xxx xx xx');
    }

    function getLastChar(str) {
        var arr = str.split(''),
        lastChar = arr[arr.length-1];
        return lastChar;
    }

    function checkForNumber(str) {
        var notNumber = /[^0-9]/g,
        arr = [],
        arrLength;

        arr = str.split('');
        arrLength = arr.length;

        if (notNumber.test(getLastChar(str))) {
            
            arr.splice(-1,1);
            str = arr.join('');

            return addSpaces(arr, str);

        }  else {

            return addSpaces(arr, str);

        }

    }

    function allowSymbols(e) {
        // Allow: backspace, delete, tab, escape
        if ($.inArray(e.which,[46,8,9,27]) !== -1 ||
             // Allow: home, end, left, right
            (e.which >= 35 && e.which <= 39)) return true;
    }

    function addSpaces(arr, str) {
        if (arr.length === 3 || arr.length === 7 || arr.length === 10) { //dont change arr.length because splice
            return str + ' ';
        } else {
            return str;
        }
    }

})(jQuery);



$(function() {

    var $form = $('.form');

    $form
    .attr('unselectable', 'on')
    .css('user-select', 'none')
    .on('selectstart', false);

    $('#pay-form-phone').checkPhone();

    $('#pay-form-phone-regexp').checkPhone({modeRegexp:true});

    $('#pay-form-name').checkName();

    $('#checkbox').on('click', function() {
        var $submit = $('#submit');

        if ($(this).prop( "checked" )) {
            $submit.removeAttr('disabled');
        } else {
            $submit.attr('disabled', 'disabled');
        }

    });

});
