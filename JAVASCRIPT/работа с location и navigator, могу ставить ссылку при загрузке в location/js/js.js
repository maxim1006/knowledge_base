//Все объекты являются свойствами объекта window
// var a = 3;
// console.log(window.a);

// console.log(window.location);

//событие на изменение hash
// window.onhashchange = function() {
//     console.log(window.location.hash.slice(1));
// }

// window.location = "http://google.ru"; или location = "http://google.ru"; //перекидывает на указанную страницу

//возвращаю ссылку на которой нахожусь
// console.log(location.toString()); 

//Кодирую запрос
// var encoded = encodeURI("http://google.com?name=Какое-то имя");
// console.log(encoded);
// console.log(decodeURI(encoded));


//Делаю переход по меню с сохранением хеша для него в ссылках нужны #
// var links, updatestate, contentDiv;

// contentDiv = document.querySelector('.content');

// links = {
//     main: "This is the main page",
//     about: "About page",
//     content: "Look at the content page"
// }

// updatestate = function() {
//     var content = links[location.hash.slice(1)];
//     contentDiv.innerHTML = content || "Page not found";
// }

// window.addEventListener('hashchange', updatestate);
// window.addEventListener('load', updatestate);




//Делаю переход по меню с сохранением хеша для него в ссылках нужны #
var links, updatestate, contentDiv, nav;

contentDiv = document.querySelector('.content');
nav = document.querySelector('.nav');

links = {
    main: "This is the main page",
    about: "About page",
    content: "Look at the content page"
}

updatestate = function(state) {
    if (!state) return;
    contentDiv.innerHTML = links[state.page];
}

//Для того чтобы обновлять при перезагрузке страницы контент 
window.addEventListener('popstate', function(e) {
    updatestate(e.state);
});

nav.addEventListener('click', function(e) {
    e.preventDefault();
    var state;

    if (e.target.tagName !== 'A') return;

    state = {
        page: e.target.getAttribute('href')
    };

    history.pushState(state, '', state.page); // первый аргумент хранит объект состояния, второй описание, третий относительная ссылка
    console.log(updatestate());
    updatestate(state);
    
});

