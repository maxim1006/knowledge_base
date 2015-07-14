var str = '';

for (var i=0; i<1000; i++) {
    str+= '<div class="block">asdfaasdf</div>'
}

requestID = window.requestAnimationFrame(function(time) {
    console.log(time);
    $('body').append(str);
    console.log('callback done');
});

var a = 0;

//c requestAnimationFrame
(function animloop(){
    var globalID = requestAnimationFrame(animloop);

    render();

    function render() {
        if (a===300) cancelAnimationFrame(globalID);
        $('body').css({'margin-top': a});
        a++;
        console.log(a);
    }

})();


//c setInterval
//var globalID = setInterval(function(){
//    if (a===300) clearInterval(globalID);
//        $('body').css({'margin-top': a});
//        a++;
//        console.log(a);
//}, 10);


//полифилл для requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


//Задать количество fps
//var fps = 15;
//function step() {
//    setTimeout(function() {
//        requestAnimationFrame(step);
//        // Drawing code goes here
//    }, 1000 / fps);
//}

//отрисовка по времени
//var time;
//function step() {
//    requestAnimationFrame(step);
//    var now = new Date().getTime(),
//        dt = now - (time || now);
//
//    time = now;
//
//    // для примера сдвиг по оси х
//    this.x += 10 * dt; // Увеличивать х на десять единиц в секунду
//}

//Отрисовать что-нибудь
//stepAnimation = function () {
//    // Do something to move to the next frame of the animation
//    // then
//    step();
//}
//
//step = function () {
//    window.requestAnimationFrame(stepAnimation);
//}
//
//step();


//пример от Криса
//var globalID;
//
//function repeatOften() {
//    $("<div />").appendTo("body");
//    globalID = requestAnimationFrame(repeatOften);
//    console.log(123);
//}
//
//$("#start").on("click", function() {
//    globalID = requestAnimationFrame(repeatOften);
//});
//
//$("#stop").on("click", function() {
//    cancelAnimationFrame(globalID);
//});


//Пример от Пола Айриша
// shim layer with setTimeout fallback
//window.requestAnimFrame = (function(){
//    return  window.requestAnimationFrame       ||
//        window.webkitRequestAnimationFrame ||
//        window.mozRequestAnimationFrame    ||
//        function( callback ){
//            window.setTimeout(callback, 1000 / 60);
//        };
//})();
//
//
//// usage:
//// instead of setInterval(render, 16) ....
//
//(function animloop(){
//    requestAnimFrame(animloop);
//    render();
//})();
//// place the rAF *before* the render() to assure as close to
//// 60fps with the setTimeout fallback.