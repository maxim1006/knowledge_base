$(function() {

    var $wrap = $(".wrap__small_right").data("content");
    $(".wrap__small_right").text($wrap.name);


    var $wrap1 = $('.wrap__small_left').data('JSONObj', {"name":"Aliya"});
    $('.wrap__small_left').text($wrap1.data('JSONObj').name);

});