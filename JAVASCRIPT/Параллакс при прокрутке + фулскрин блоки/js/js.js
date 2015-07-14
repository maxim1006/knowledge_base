(function() {

    $(function() {
        window.onscroll = function emParallax() {
            if (window.pageYOffset > 0) {
                document.getElementById("parallax").style.fontSize = (window.pageYOffset/20)*.1+"em";
            }
        };

        document.getElementById('candles').addEventListener('click', function() {
            launchFullScreen(this);
        }, false);
    });

    function launchFullScreen(element) {
        if (element.requestFullscreen)
        { element.requestFullscreen(); }
        else if (element.mozRequestFullScreen)
        { element.mozRequestFullScreen(); }
        else if (element.webkitRequestFullscreen)
        { element.webkitRequestFullscreen(); }
        else if (element.msRequestFullscreen)
        { element.msRequestFullscreen(); }
    }

    function cancelFullScreen() {
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        }
    }

})();