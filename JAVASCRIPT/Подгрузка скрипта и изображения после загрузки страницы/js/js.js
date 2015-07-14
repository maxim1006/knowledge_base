//Подгрузка картинки после загрузки странички

window.onload = function() {
    var sources = ['0.jpg'];
    preloadImages(sources, function(img) {
        console.log('img loaded');
        var firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(img, firstScript);
    });

};

function preloadImages(sources, callback) {
    var counter = 0;
    
    function onLoad() {
        counter++;
        if (counter == sources.length) callback(img);
    }
    
    for (var i = 0; i < sources.length; i++) {
        var img = document.createElement('img');
        // сначала onload/onerror, затем src - важно для IE<9
        img.onload = img.onerror = onLoad;
        img.src = sources[i];
    }

}


//Выполнение скрипта после его загрузки
function addScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
    
    var loaded = false;
    
    function onload() {
        if (loaded) return; // повторный вызов
        loaded = true;
        callback();
    }
    
    script.onload = onload; // все браузеры, IE с версии 9
    
    script.onreadystatechange = function () { // IE<9
        if (this.readyState == 'loaded' || this.readyState == 'complete') {
            setTimeout(onload, 0);
        }
    };
}

addScript("go.js", function() {
   go();
});

function go() {
    console.log('script go.js is loadded');
}