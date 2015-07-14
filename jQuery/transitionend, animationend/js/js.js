(function() {
    //callback on transition end
    $(".block__transition").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
        console.log('transition ended');
    });
})();

(function() {
    //callback on animation end
    $(".block__animation").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
        $(this).toggleClass('block__animation_back');
        console.log('animation ended');
    });
})();