//Найти уникальные значения в массиве
// function getUniqueArray(array: any[]) {
//     return array.filter(function (item, index, self) {
//         return self.indexOf(item) === index;
//     });
// }

//найти высоту/ширину страницы
//  getViewport() {
//     let documentElement = document.documentElement,
//         body = document.body,
//         width = window.innerWidth || documentElement.clientWidth || body.clientWidth,
//         height = window.innerHeight || documentElement.clientHeight || body.clientHeight;
//
//     return {width: width, height: height};
// }

//isInteger
/*Number.isInteger(value)

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number'
        && isFinite(value)
        && Math.floor(value) === value;
};*/



//получить введенный символ с клавиатуры
/*function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // остальные
    }

    return null; // специальная клавиша
}*/
//по нажатию отследить цифры
/*
moneyElem.onkeypress = function(e) {
    e = e || event;
    var chr = getChar(e);

    console.log(chr);

    if (e.ctrlKey || e.altKey || chr == null) return; // специальная клавиша
    if (chr < '0' || chr > '9') return false;
};
*/



//Функция throttle
/*function throttle(f, ms) {
    var isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return
        }

        f.apply(this, arguments);
        isThrottled = true;

        setTimeout(function() {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}*/

//Кастомная функция задержки
/*function delay(f, ms) {
    var savedThis = this,
        savedArgs = arguments;

    setTimeout(function() {
        f.apply(savedThis, savedArgs);
    }, ms);
}

console.log(new Date);

function f() {
    console.log(new Date);
}

delay(f, 3000);*/

//Типы
/*console.log(typeof 1);
console.log(typeof true);
console.log(typeof 'text');
console.log(typeof undefined);
console.log(typeof function() {});
console.log(typeof null); //Object
console.log(typeof Object); //function
console.log(typeof []);
console.log(Array.isArray([])); //true*/

/*function getClass(obj) {
    return {}.toString.call(obj).slice(8, -1);
}*/

//Кеширующий декоратор
/*function makeCaching(f) {
    var cache = {};

    return function(x) {
        if (!(x in cache)) {
            cache[x] = f.call(this, x);
        }
        return cache[x];
    };
}

function f(x) {
    return Math.random()*x;
}

f = makeCaching(f);

var a = f(1);
var b = f(1);

console.log(a === b);

b = f(2);
console.log(a === b);*/

//декоратор для подсчета времени выполнения функции с примером использования
/*
var timers = {};

function timingDecorator(f, timer) {
    return function() {
        var start = new Date;

        var result = f.apply(this, arguments);

        if (!timers[timer]) timers[timer] = 0;
        timers[timer] += new Date - start;

        return result;
    }
}

function fibo(n) {
    return (n > 2) ? fibo(n - 1) + fibo(n - 2) : 1;
}

fibo = timingDecorator(fibo, "fibo");

console.log((fibo(10)));
console.log((fibo(20)));
console.log(timers.fibo + ' ms');
*/

//Кроссбраузерный bind
/*function bind(f, context) {
    return function() {
        return f.apply(context, arguments);
    }
}*/

//получить максимум из элементов arr
//Math.max.apply(null, arr);

//Проверка а число
/*function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}*/

//функция для замера времени выполнения
/*
function bench(f) {
    var date = new Date();
    for (var i = 0; i < 100000; i++) f();
    return new Date() - date;
}
*/

//функция unique
/*var arr = ['Max', 'Aliya', 'Max'];

function unique(arr) {
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }

    return Object.keys(obj);
}

console.log(unique(arr));*/



//проверка на число
/*
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
*/



//проверка на пустой объект
/*function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}*/

//проверка на array
/*
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
*/


//делаю массив из аргументс
/*var array = Array.prototype.slice.call(arguments, 0);*/

//вызов функции через arguments
/*
arguments.callee — ссылка на саму функцию.

function foo () {
    console.log(arguments.callee === foo); // true
}
*/

//так узнаю правильное ли количество аргументов передано в ф-цию
/*function test (foo, bar, qux) {
    return arguments.callee.length === arguments.length;
}

test(1); // false
test(1,2,3); // true*/


//так вставляю любой html в страницу
//document.body.insertAdjacentHTML('beforeend', '<p>Строка, вставленная с помощью insertAdjacentHTML</p>');

//функция для вставки текста, пришедшего на ajax запрос
/*function onSuccess(newHtml) {
    parentList.insertAdjacentHTML('beforeend', newHtml);
}*/



// //Удаляю из array значение
// var arr = ['a', 'b', 'c', 'd'];
// var pos = arr.indexOf( 'c' );
// pos > -1 && arr.splice( pos, 1 );
// console.log(arr);


//  Deal with WebSocket timeout
// Обычно, когда соединение установлено, сервер может сбросить соединение по тайм-ауту после 30 секунд неактивности. Фаервол может также после определенного периода сбросить соединение по тайм-ауту из-за неактивности.
// Данную проблему можно решить путем посылок пустых сообщений серверу. Чтоб сделать это, следует добавить две функции в ваш код: одна, чтобы поддерживать соединение и другая, чтобы отменить эту поддержку.
// Используя данный трюк, вы будете управлять тайм-аутом.

// Добавляем `timerID`…
//         var timerID = 0;
//         function keepAlive() {
//             var timeout = 15000;
//             if (webSocket.readyState == webSocket.OPEN) {
//                 webSocket.send('');
//             }
//             timerId = setTimeout(keepAlive, timeout);
//         }
//         function cancelKeepAlive() {
//             if (timerId) {
//                 cancelTimeout(timerId);
//             }
//         }
// `keepAlive()` следует добавить в конец `onOpen()` метода для webSocket
// соединения и `cancelKeepAlive()` в конец `onClose()` метода.


// Устанавливайте задержки для `XMLHttpRequests` :
// Вы можете потерять соединение, если XHR занимает слишком большое время (как пример, сетевые проблемы), используйте `setTimeout()` с вызовами
// XHR.
// var xhr = new XMLHttpRequest ();
// xhr.onreadystatechange = function () {
//     if (this.readyState == 4) {
//         clearTimeout(timeout);
//         // do something with response data
//     }
// }
// var timeout = setTimeout( function () {
//     xhr.abort(); // call error callback
// }, 60*1000 /* timeout after a minute */ );
// xhr.open('GET', url, true);

// xhr.send();


// HTML escaper :
// function escapeHTML(text) {
//     var replacements= {"<": "<", ">": ">","&": "&", "\"": """};
//     return text.replace(/[<>&"]/g, function(character) {
//         return replacements[character];
//     });
// }


// Используйте `switch/case` выражение с численными диапазонами :
// function getCategory(age) {
//     var category = "";
//     switch (true) {
//         case isNaN(age):
//             category = "not an age";
//             break;
//         case (age >= 50):
//             category = "Old";
//             break;
//         case (age <= 20):
//             category = "Baby";
//             break;
//         default:
//             category = "Young";
//             break;
//     };
//     return category;
// }
// getCategory(5);  // will return "Baby"


// Сериализация и десериализация (для JSON) :
// var person = {name :'Saad', age : 26, department : {ID : 15, name : "R&D"} };
// var stringFromPerson = JSON.stringify(person);
// console.log(stringFromPerson);
//  stringFromPerson is equal to "{"name":"Saad","age":26,"department":{"ID":15,"name":"R&D"}}"   
// var personFromString = JSON.parse(stringFromPerson);
// console.log(personFromString);
// /* personFromString is equal to person object  */


// Проверяйте свойства объекта, когда пользуетесь `for-in` циклом :
// Данный пример кода может быть использован, чтобы избежать итераций по свойствам прототипа объекта.
// for (var name in object) {
//     if (object.hasOwnProperty(name)) {
//         // do something with name
//     }
// }


//Округление числа до N чисел после запятой :
// var num =2.443242342;
// num = num.toFixed(4);  // num will be equal to 2.4432
// console.log(num);


//Используйте `map()`метод, чтобы пройти циклом по массиву :
// var squares = [1,2,3,4].map(function (val) {
//     return val * val;
// });
// console.log(squares);


// Делаем массив пустым :
// var myArray = [12 , 222 , 1000 ];
// myArray.length = 0;


//Преобразовать объект `arguments` в массив :
// function fn() {
//     var argArray = Array.prototype.slice.call(arguments);
//     console.log(argArray);
// }
// fn(1, 'a', {a:1,b:2});


//Перемешивание массива :
// var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
// numbers = numbers.sort(function(){ return Math.random() - 0.5});
// console.log(numbers);


//Генерация произвольного набора символов :
// function generateRandomAlphaNum(len) {
//     var rdmString = "";
//     for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
//     return  rdmString.substr(0, len);
// }
// console.log(generateRandomAlphaNum(5));


// //Генерация численного массива от 0 до max :
// var numbersArray = [] , max = 100;
// // numbers = [0,1,2,3 ... 100]
// for( var i=1; numbersArray.push(i++) < max;);
// console.log(numbersArray);


//Рандомное число из диапазона
//Math.floor(Math.random() * (max - min + 1)) + min;
//функция для рандомного числа
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }


//Получение произвольного значения из массива :
// var items = [12,548,'a',2,5478,'foo',8852,'Doe',2145,119];
// var randomItem = items[Math.floor(Math.random() * items.length)];
// console.log(randomItem);


//random id
// function generateId() {
//     return (Math.random() + "").substr(2) + "__" + Date.now();
// }
//
// console.log(generateId()); //2538671640213579__1481046038321

//Нахожу минимальное и максимальное значение в array
// function smallest(arr) {
//     return Math.min.apply(Math, arr);
// }

// function largest(arr) {
//     return Math.max.apply(Math, arr)
// }

// Кросс-браузерный XHR:
// function xhr(m,u,c,x){with(new(this.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP"))onreadystatechange=function(x){readyState^4||c(x)},open(m,u),send(с)}

// Использование:
// xhr('get', '//ya.ru/favicon.ico', function(xhr){console.dir(xhr)});




// Создаю обертку для функции
// В традиционном виде, это выглядело бы так:
// function bar() {}
// // foo(context, arg1, arg2, ...)
// function foo() {
//     var context = arguments[0]; 
//     var args = Array.prototype.slice.call(arguments, 1); //делаем массив аргументов для bar
//     bar.apply(context, args);
// }

// Вместо этого салата использовать трюк с call.apply:
// function foo() { 
//     Function.call.apply(bar, arguments);
// }

// Работает это так: aplly вызывает Function.call на объекте bar c переданными в foo параметрами. То есть получаем следующее для самого первого примера с context и arg1, arg2: 
// bar.call(context, arg1, arg2)


// Привожу nodeList к массиву
// // Приводим к массиву: мы подсовываем фукнции slice this, который поход на массив
// Array.prototype.slice.call(document.getElementsByTagName("div")).forEach(function (elem) {
//     // OK
// });

// // Аналогично можно сделать со строками
// Array.prototype.slice.call('pewpew') // ["p", "e", "w", "p", "e", "w"]
// // В ИЕ8- будет будет массив из undefined


// console.log([].slice.call(document.querySelectorAll("div.class"))); // возвращает array элементов (без этого возвратил бы nodeList)




                                        //Начало jquery free




//Selectors
// console.log(document.getElementById("id"));
// console.log(document.getElementsByTagName("span"));
// console.log(document.getElementsByClassName("class")); // ie9+
// console.log(document.querySelectorAll("div.class"));
// console.log(document.querySelector("div.class")); //выбираю только первый класс


//Выбираю элементы
// console.log(document.querySelectorAll("div.class").item(2));
// console.log(document.querySelectorAll("div.class")[0]);



//first & last elements
// var dates = document.querySelectorAll("div.class");
// //first
// console.log(dates[0]);
// console.log(document.querySelector("div.class"));
// //last
// console.log(dates[dates.length - 1]);
// console.log([].pop.call(dates));



//is
// if( Element && !Element.prototype.matches ) {
//     var proto = Element.prototype;
//     proto.matches = proto.matchesSelector||
//     proto.mozMatchesSelector||
//     proto.msMatchesSelector||
//     proto.oMatchesSelector||
//     proto.webkitMatchesSelector;
// }
// console.log(document.getElementById("id").matches("div.id"));




//filter
// var nodes = [].slice.call(document.querySelectorAll("div.class"));

// console.log(
//     nodes = nodes.filter(function(elem) {
//         return elem.matches("div.class"); //возвращаю все элементы совпадающие с div.class
//     })
// );

// console.log(
//     nodes = nodes.filter(function(elem) { 
//         return elem; //если возвращаю true, то элемент остается, если false, то нет
//     })
// );



//find
// console.log (
//     document.getElementById('id')
//     .querySelectorAll('input.date')
// );
//к примеру нужно найти все элементы input во всех дивах
//var divs = document.querySelectorAll('div'), inputs = [];
// Array.prototype.forEach.call(divs, function(div) {
//     inputs = inputs.concat([].slice.call(div.querySelectorAll("input.date"))) //concat - создает новый массив, и если добавлены новые переменные элементарного
//     //типа добавляет их как есть
// });

// console.log(inputs);




//Previous & Next
// var elem = document.getElementById("id");
// console.log(elem.previousElementSibling);
// console.log(elem.nextElementSibling);



//closest
// if( Element && !Element.prototype.closest ) {
//     Element.prototype.closest= function(selector, filter) {
//         var node = this, found;

//         filter = typeof filter === 'string'?
//         document.querySelector(filter) : filter;

//         while(node instanceof Element &&
//             !(found = node.matches(selector)) &&
//             node !== filter) {
//             node = node.parentNode;
//         }

//         return found ? node : null;
//     };
// }

// var elem = document.querySelector('input.date');
// console.log(elem.closest('div')); //этот closest принимает 2 аргумента, первый это то что ищем, второй билжайший контекст в котором мы это ищем.



//class
//Native: Option 1
// document.getElementById("id").className+= " active";
// document.getElementById("id").className= "";
//Native: Option 2
// https://github.com/eligrey/classList.js
// var obj = document.getElementById("id");
// obj.classList.add("active");
// obj.classList.add("active", "dirty");
// obj.classList.remove("active");
// obj.classList.toggle("active");
// console.log(obj.classList.contains("active"));

//$().hasClass();
// function hasClass(elem, className) {
//     return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
// }

/*
function hasClass(elCls, cls) {
    return (" " + elCls + " ").indexOf(" " + cls + " ") !== -1!I!
}
function addClass(elCls, cls) {
    if (!hasClass(elCls, cls)) return elCls += " "+cls
}
function removeClass(elCls, cls) {
    if (hasClass(elCls, cls)) {
        var re = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        return elCls.replace(re, ' ')
    }
}
*/


//.html()
// console.log(document.getElementById("id").innerHTML);
// console.log(document.getElementById("id").innerText);
// console.log(document.getElementById("id").innerHTML = "<strong> Hi its Max </strong>");
// console.log(document.getElementById("id").innerText = "Hi its Max");



//append, prepend
// var pDiv = document.createElement("div");
// pDiv.innerText = "inserted element";
// document.getElementById("id").insertBefore(pDiv, document.getElementById("id").firstChild); //prepend, первый параметр в insertBefore - что вставляю, второй перед чем вставляю
//document.getElementById("id").appendChild(pDiv); //append



//empty(), html(), remove()
// var objId = document.getElementById('id');
//empty()
// objId.innerHTML = "";
// //html()
// while (objId.lastChild) {
//     objId.removeChild(objId.lastChild);
// }
// //remove()
// objId.parentNode.removeChild(objId);



//css
// var objId = document.getElementById('id');
// // objId.style.color = "red";
// // objId.style.backgroundColor = "blue";
// // objId.style.fontSize = '20px';
// //функция helper
// function updateStyle(element, styles) {
//     for(var style in styles) {
//         if(styles.hasOwnProperty(style)) {
//             element.style[style] = styles[style];
//         }
//     }
// }

// updateStyle(objId, {
//     color: "red",
//     backgroundColor: "blue"
// });




//.has() ie9+
//var result = parent.contains(child);






//attr & prop
// var search = document.getElementById("search"),
// var toggle = document.getElementById("toggle");
// anchor = document.getElementById("about");

// search.setAttribute("placeholder", "Search here...");
// search.getAttribute("placeholder");

// toggle.checked = true;
//toggle.checked;
// toggle.onclick = isChecked;
// function isChecked() {
//     toggle.checked === true ? console.log('checked') : console.log('not checked');
// }

// anchor.getAttribute("href"); //./pages/about.html //attr
// anchor.href; //http://domain.com/pages/about.html //prop



//val()
//var inputText = document.querySelector('input.input-text');
// console.log(inputText.value); //проверяю value
//inputText.value = "Max";//устанавливаю value



//height() & width();
// var box = document.getElementById('id');
// console.log(box.clientWidth);//width+padding
// console.log(box.offsetWidth);//width+padding+border
// console.log(box.style.paddingTop);



//handlers
//если нужен хендлер для одного элемента
// document.getElementById('id').addEventListener('click', function() {
//     console.log(123);
// });
// //для нескольких
// var divs = document.querySelectorAll('div');
// Array.prototype.forEach.call(divs, function(div) {
//     div.addEventListener('click', callback);
// });

// function callback() {
//     console.log(123);
// }

// function getClass(obj) {
//     return Object.prototype.toString.call(obj).slice(8, -1);
// }




// //unbind
// var element = document.getElementById("save"),
// callback = function() {};
// для одного элемента
// element.removeEventListener("click", callback);
//для нескольких элементов
// var buttons = document.querySelectorAll("button");
// Array.prototype.forEach.call(buttons, function(button) {
//     button.removeEventListener("click", callback);
// });



//delegate
// document.getElementById('id').addEventListener('click', callback);
// function callback(e) {
//     var elem = e.target, found = false;

//     while (elem instanceof Element &&
//         !(found = elem.matches('input')) &&
//         this !== elem) {
//         elem = elem.parentNode;
//     }

//     if (found) {
//         console.log('delegated');
//     }
// }
//undelegate
//document.getElementById('id').removeEventListener('click', callback);



//e.target, e.which, e.preventDefault, e.stopPropagation;
// document.getElementById('id').querySelector('input').addEventListener('keypress', callback);
// function callback(e) {
//     console.log(e.which); //работает в ie9+
//     console.log(e.target);
//     // e.preventDefault();
//     // e.stopPropagation();
// }



//bind
// var obj = {
//     name: 'Max'
// }
// document.getElementById('id').addEventListener('click', callback.bind(obj));
// function callback() {
//     console.log(this.name);
// }



//trigger
// document.getElementById('id').addEventListener('click', function(e, arg1, arg2) {
//     console.log(e);
//     console.log(e.detail);
//     console.log(e.detail[0]);
//     console.log(e.detail[1]);
// }); 
// //trigger без аргументов
// // var event = new Event('click');
// // document.getElementById('id').dispatchEvent(event);
// //trigger с аргументами
// console.log(CustomEvent);
// var event = new CustomEvent('click', {detail: ['Max', 'Aliya']});
// document.getElementById('id').dispatchEvent(event);



//Dom ready
//1 способ: помещаю весь код в <script>...</script> в боттом страницы
//2 способ: 
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('content is been loaded');
// });



//$.ajax, $.get
// var r = new XMLHttpRequest();
// r.open("GET", "http://habrahabr.ru/", true);
// r.onreadystatechange = function () {
//   if (r.readyState != 4 || r.status != 200) return;
//   // Профит?
// };
// r.send();

//библиотечка дял xhr https://github.com/ded/reqwest


//$.post
//1ый способ без formData
// var xhr= newXMLHttpRequest();
// xhr.open("POST", "/echo/json/", true);
// xhr.setRequestHeader("Content-type",
// "application/x-www-form-urlencoded");
// xhr.onload= function() {
//     if(this.status=== 200) {
//         alert(this.responseText);
//     }
// };
// xhr.send("category=books&sort=asc");

//2ой способ с formData, тут прикол в том, что можно задать форму и 
//все ее значения автоматом передадуться
// var form = document.getElementById("myForm"),
// formData = newFormData(form),
// xhr = newXMLHttpRequest();
// xhr.open("POST", "/echo/json/", true);
// xhr.setRequestHeader("Content-type",
// "application/x-www-form-urlencoded");
// xhr.onload= function() {
//     if(this.status=== 200) { 
//         alert(this.responseText); 
//     }
// };
// xhr.send(formData);

//json, нужно jsonpCallback чтобы сервер передовал как параметр, в 
//строке браузера
// function jsonpCallback(data) {
// //Handle data from server
// }
// varscript = document.createElement("script");
// script.src=
// "http://jsfiddle.net/echo/jsonp?callback=jsonpCallback";
// document.head.appendChild(script);


//$().data() 
// var contact = document.getElementById("contact"),
// user = { fname: "John", lname: "Smith"};
// contact.getAttribute("data-contact-name"); // string
// contact.setAttribute("data-contact-name", "Jane Smith");
// contact.setAttribute(
//     "data-contact-name",
//     JSON.stringify(user)
// );
// user = JSON.parse(
//     contact.getAttribute("data-contact-name")
// );


//$.each, $.grep, $.map, ~ это -(n+1), иполльзуется с indexOf
// languages.forEach(function(language) {
//     console.log(language.id + ": "+ language.date);
// });
//или если nodeList
// function $$(selector) {
//     return [].slice.call(document.querySelectorAll(selector));
// }
// $$("div.class").forEach(function(elem, index) {
//     elem.innerText = "Hello" + index;
// });

// languages = languages.filter(function(language) {
//     return ~language.id.indexOf("Script");
// });

// languages = languages.map(function(language) {
//     return {
//         name: language.id,
//         age: newDate().getFullYear() -language.date
//     };
// });


//$.inArray()
// var fruit = ["orange", "apple", "pear", "pineapple"];
// console.log("Found Pear: "+ !!~fruit.indexOf("pear"));


//$.type();
// function getClass(obj) {
//     return Object.prototype.toString.call(obj).slice(8, -1);
// }


//$.extend - если понадобиться посмотреть как реализовано в underscore.js
// Underscore or Lo-Dash
// varcombined = _.extend(
//     { color: "PapayaWhip", font: "Tahoma"}, // destination
//     { color: 'Chartreuse'}// sources...
// );


//$.trim()
// var message = " look at me, I'm padded! ";
// console.log(message.trim());


//$fadeOut(), $fadeIn()
//Использую transition и opacity


//$slideUp, $slideDown, $slideToggle
//Использую transition и height


//$.extend()
// в этом примере tooltip - это название плагина
// options = options || {};
// tooltip.element.style.backgroundColor=
// options.backgroundColor|| tooltip.defaults.backgroundColor;
// tooltip.element.style.color=
// options.color|| tooltip.defaults.color;


//$append()
// tooltip.element = document.getElementById("tooltip");
// if (!tooltip.element) {
//     tooltip.element = document.createElement("div");
//     tooltip.element.id = "tooltip";
//     tooltip.element.innerText = "Default Text";
//     document.body.appendChild(tooltip.element);
// }


//$.text(), position.top, position.left
// tooltip.element.innerText = element.title;
// tooltip.element.style.top = element.offsetTop-
// tooltip.element.offsetHeight + "px";
// tooltip.element.style.left = element.offsetLeft+ "px";


//jQuery plugin
// (function(tooltip, undefined) {

// tooltip.element = null;
// tooltip.init = function(options) { /* ... */ };
// tooltip.wire = function(element) { /* ... */};
// tooltip.defaults = { /* ... */};

// }(window.tooltip = window.tooltip|| {}));

// var nodes = document.querySelectorAll("a");

// tooltip.init({ color: "blue", backgroundColor: "thistle"});

// Array.prototype.forEach.call(nodes, function(element) {
//     tooltip.wire(element);
// });


//Адаптер для jQuery с его помощью делаю что-то среднее между jQuery
//pluginom и обычным.
// ($.fn.tooltip = function(options) {
//     tooltip.init(options);
//     returnthis.each(function() {
//         tooltip.wire(this);
//     });
// };
// }(jQuery, tooltip));

// $("a").tooltip();

/*var obj = {

};

function getClass(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

console.log(getClass(obj) === 'obj');*/

//Kebab case convert
// private convertToKebabCase(value: string):string {
//     return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
// }