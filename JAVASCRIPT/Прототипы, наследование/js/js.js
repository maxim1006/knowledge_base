// $(function() {

//     //var;

//     function init() {
//         updateVars();
//         bindEvents();
//     }

//     function updateVars() {
//     }

//     function bindEvents() {
//     }

//     init();

// });

//1. в обычных переменных хранятся обычные значения
// var a = 3;
// var b = 5;

// a = b;

// b = 10;
// console.log(a);

// var a = 'String';
// var b = 'another';

// a = b;
// console.log(a);


// //2. Все объекты хранят ссылку на исходный объект
//var a = {x: 10};
//var b = {x: 20};
//
//a = b;
//
//b.x = 15;
//console.log(a);
//
//a.x = 45;
//console.log(b);
//
//var a = [1,2,3];
//var b = [4,5,6];
//
//a = b;
//
//b.push(3);
//console.log(a);

//3.1 Создание нового объекта
// var man = {
//     name: 'Max',
//     age: '26',
//     working: true,
//     like: function() {
//         return this.name + 'love Aliya';
//     }
// };

// var anotherMan = Object.create(man);
// console.log(anotherMan.name);

//3.2 Если нужно создать много объектов
// var Person = {
//     constructor: function(name, age, working) {
//         this.name = name;
//         this.age = age;
//         this.working = working;
//         return this;
//     },
//     like: function() {
//         return this.name + ' love Aliya';
//     }
// };

// var person1, person2, person3;

// person1 = Object.create(Person).constructor('Anton', 27, false);
// person2 = Object.create(Person).constructor('Aliya', 27, true);
// person3 = Object.create(Person).constructor('Mother', 55, true);
// person4 = Object.create(Person).constructor('Max', 26, true);

// console.log(person1.name);
// console.log(person4.like());
// console.log(Object.create(Person).constructor());
// console.log(Person.isPrototypeOf(person1));


//3.3 Создаю новые классы со свойствами и методами класса Person
// var Person = {
//     constructor: function(name, age, working) {
//         this.name = name;
//         this.age = age;
//         this.working = working;
//         return this;
//     },
//     like: function() {
//         return this.name + ' love Aliya';
//     }
// };

// var WebDeveloper = Object.create(Person);
// WebDeveloper.constructor = function(name, age, working, skills) {
//     Person.constructor.apply(this, arguments);
//     this.skills = skills || [];
//     return this;
// };

// var developer = Object.create(WebDeveloper).constructor('Max', 26, true, ['html', 'css', 'js']);
// console.log(developer.skills);
// console.log(developer.like());

//3.4 создание объекта через Object.create, почти тоже самое что и через prototype:
//через Object.create
// var WebDeveloper = Object.create(Person);
// console.log(WebDeveloper.like);
//через prototype
// var WebDeveloper = function() {};
// WebDeveloper.prototype = Person;
// console.log(WebDeveloper.prototype.like);


//3.5 Создание объекта через конструктор
// var Person, person, anotherPerson;

// function Person(name) {
//     this.name = name;
// }

// Person.prototype.greet = function() {
//     return 'hey ' + this.name;
// };

// person = new Person('Max');
// console.log(person.name);
// console.log(person.greet());
// console.log(person.constructor);
// console.log(person instanceof Person);
// console.log(Person.prototype);
// console.log(Person.prototype.isPrototypeOf(person));



//3.6 Создаю новые подклассы со свойствами и методами класса Person
/*var Person, person, anotherPerson, Developer, developer;

function Person(name) {
    this.name = name;
}

Person.prototype.greet = function() {
    return 'hey ' + this.name;
};

function Developer(name, skills) {
    Person.apply(this, arguments);
    this.skills = skills || [];
}

Developer.prototype = Object.create(Person.prototype); // или Developer.prototype = new Person();
Developer.prototype.constructor = Developer; //Если это не поставить, то свойство constructor будет равно Person, а не Developer
console.log(Developer.prototype.constructor);

Developer.prototype.getName = function() {
    return this.name;
};

developer = new Developer('Max', ['ruby on rails', 'java', 'meteor']);
console.log(developer.greet());//hey Max
console.log(developer.getName());//Max
console.log(developer instanceof Developer);//true
console.log(developer instanceof Person);//true
console.log(Person.prototype.isPrototypeOf(developer));//true
console.log(Developer.prototype.isPrototypeOf(developer));//true
console.log(developer.constructor);//[Function: Developer]*/


//3.7 Определение классов объектов Javascript с помощью метода toString()
// console.log({}.toString());
// console.log(Object.prototype.toString.call([]));

// function getClass(obj) {
//     return Object.prototype.toString.call(obj).slice(8, -1);
// }
// console.log(getClass(""));
// console.log(getClass([]));
// console.log(getClass([]) === 'Array');
// console.log(getClass({}));
// console.log(getClass(/\w/));
// console.log(getClass(123));
// console.log(getClass(true));
// console.log(getClass(function(){}));



//Функция эмуляции Object.create для ie8-
/*function inherit(proto) {
    function F(){}
    F.prototype = proto;
    return new F();
}

var a = {age: 15};
var b = inherit(a);

//Object.create = inherit;//можно сделать, чтобы унифицировать функцию для ie8-

console.log(b.constructor === Object);

function getClass(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

console.log(getClass(b));*/



//Наследование из телуса
$(function() {

    var Obj = function(){};
    Obj.prototype.canRun = true;

    function inherits(Parent, ChildPrototype) {
        var Child = function(){};
        var F = function (){};

        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;

        $.extend(Child.prototype, ChildPrototype);

        return Child;
    }

    var Obj1 = inherits(Obj, {
        name: 'Max'
    });

    var obj1 = new Obj1();

    console.log(Obj1.prototype);

    var Obj2 = inherits(Obj1, {
        wife: 'Aliya'
    });

    console.log(Obj2.prototype);

    console.log(Obj1.prototype.name + ' Obj1.prototype.name');//Max
    console.log(obj1.name + ' obj1.name'); //Max
    console.log(obj1 instanceof Obj1);//true
    console.log(obj1.canRun); //true
    console.log(obj1.constructor); //function (){}
    console.log(Object.getPrototypeOf(obj1) === Obj1.prototype); //true

});



//Наследование из хабра
/*function inherit (object, parent) {
    function F(){} // Подставной конструктор
    F.prototype = parent.prototype; // Подсовываем прототип реального конструктора
    object.prototype = new F(); // Теперь реальный конструктор не будет выполнен
    return object; // Можно и не возвращать
}

var Obj = function() {};
Obj.prototype.name = 'Aliya';

var Obj1 = function() {};

inherit(Obj1, Obj);

var obj1 = new Obj1();

console.log(Obj1.prototype.name);//Aliya
console.log(obj1.name);//Aliya
console.log(obj1 instanceof Obj1);//true
console.log(Obj1.constructor);//Function
console.log(Object.getPrototypeOf(obj1) === Obj1.prototype);//true

Obj1.prototype.name = 'Max';

console.log(Obj1.prototype.name);//Max
console.log(obj1.name);//Max
console.log(obj1 instanceof Obj1);//true*/



//У любого объекта есть свойство __proto__, которое ссылается на прототип соответствующего ему типа данных, при обращению к объекту свойство сперва ищется в объекте obj, затем в свойстве obj.__proto__, затем в obj.__proto__.__proto__ и т.д.
// console.log((0).__proto__ === Number.prototype);//true
// console.log(false.__proto__ === Boolean.prototype);//true
// console.log("string".__proto__ === String.prototype);//true
// console.log((new Date).__proto__ === Date.prototype);//true
// console.log((function(){}).__proto__ === Function.prototype);//true
//console.log(Number.prototype.__proto__ === Object.prototype);//true
//console.log(Function.prototype.__proto__ === Object.prototype);//true
//Все типы данных наследуются от Object, это означает что к примеру:
//    Number.prototype.__proto__ === Object.prototype
//И наконец, завершение цепочки:
//    Object.prototype.__proto__ === null
//а это для лучшего понимания
/*function Obj(){};
Obj.prototype.canGo = 'yes';
var obj = new Obj();
console.log(obj.__proto__); //{ canGo: 'yes' }
console.log(obj.canGo);
console.log(obj.__proto__ === Obj.prototype); //true
console.log(obj instanceof Obj); //true
console.log(Obj.prototype.isPrototypeOf(obj)); //true
console.log(obj.constructor); //[Function: Obj]*/


//Prototype - это обычное свойство, которое есть у всех функций, но
//1) Prototype - по умолчанию является объектом с единственным свойством constructor, которое ссылается на саму функцию
//console.log(function(){}.prototype.constructor); //Function
//console.log(function f(){}.prototype.constructor); //[Function: f]
// 2) Свойство prototype используется при создании новых объектов оператором new.
// Оператор new
// Этот оператор делает следущее:
// 1) Создает пустой объект:
// var instance = {};
// 2) Устанавливает __proto__ этому объекту ссылкой на prototype функции-класса:
// instance.__proto__ = FnClass.prototype;
// 3) Применяет функцию-класс к нашему новосозданному объекту: 
// constructorReturns = FnClass.apply(instance, arguments);
// (т.е. исполняет функцию FnClass, передавая ей instance в качестве this и аргументы в виде массива arguments)
// 4) Возвращает экземпляр функции-класса, но если FnClass нам вернул обьект, тогда его:
// return constructorReturns instanceof Object ? constructorReturns : instance;


//пример того что делает оператор new
/*function newOperator(Constr, args) {
    var thisValue = Object.create(Constr.prototype); // (1)
    var result = Constr.apply(thisValue, args);
    if (typeof result === 'object' && result !== null) {
        return result; // (2)
    }
    return thisValue;
}*/


//Что такое Object.create
/*var myObj = {__proto__: {property1_OfProto: 1}};
var myObj = Object.create({property1_OfProto: 1});*/



//myObj.__proto__.property2_OfProto = 2 
//Object.getPrototypeOf(myObj).property2_OfProto = 2;
//Object.getPrototypeOf(obj) Использую для проверки данных:
//var Obj = function(){};
//console.log(Object.getPrototypeOf(Obj) === Function.prototype);//true

//Кроссбраузерная эмуляция 
/*if(!Object.create){
    Object.create = function(proto){
        var Fn = function(){};
        Fn.prototype = proto;
        return new Fn;
    }
}

if(!Object.getPrototypeOf){
    if( (new Object).__proto__ !== Object.prototype ){
        // may return incorrect value if fn.prototype has been modified
        Function.getPrototypeOf = function(fn){
            if(typeof(fn)!=='function')
                throw new TypeError('Function.getPrototypeOf called on non-function');
            return fn.constructor.prototype;
        }
    }else{
        Object.getPrototypeOf = function(obj){
            return obj.__proto__;
        }
    }
}*/


/*function Obj(){}
Obj.prototype.go = function(){console.log('go');};

function inherits(object, parent) {
    function F(){} // Подставной конструктор
    F.prototype = parent.prototype; // Подсовываем прототип реального конструктора
    object.prototype = new F(); // Теперь реальный конструктор не будет выполнен
    return object; // Можно и не возвращать
}

var Obj1 = function(){};

inherits(Obj1, Obj);

var obj1 = new Obj1();
console.log(Object.getPrototypeOf(obj1) === Obj1.prototype); //true
console.log(obj1.constructor);//[Function: Obj]*/

/*var NC = {};

NC.f = (function(){

    function f(){}

    f.prototype = {
        name: 'max'
    };

    return f;

})();

var NC1 = inherits(NC.f, {});
var nc1 = new NC1();

console.log(nc1.name);//max
console.log(nc1.constructor);//[Function]
console.log(Object.getPrototypeOf(nc1) === NC1.prototype);//true
console.log(nc1 instanceof NC1);//true


function inherits(Parent, ChildPrototype) {
    var Child = function(){};
    var F = function (){};

    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;

    $.extend(Child.prototype, ChildPrototype);

    return Child;
}
*/


/*ф-ция с js.ru*/
//function extend(Child, Parent) {
//    var F = function() { };
//    F.prototype = Parent.prototype;
//    Child.prototype = new F();
//    Child.prototype.constructor = Child;
//    Child.superclass = Parent.prototype;
//}

//// создали базовый класс
//function Animal(..) { ... }
//
//// создали класс
//// и сделали его потомком базового
//function Rabbit(..)  { ... }
//extend(Rabbit, Animal)
//
//// добавили в класс Rabbit методы и свойства
//Rabbit.prototype.run = function(..) { ... }
//
//// все, теперь можно создавать объекты
//// класса-потомка и использовать методы класса-родителя
//rabbit = new Rabbit(..)
//rabbit.animalMethod()



/*из ROE*/
/*var NCROE = window.NCROE = function(){};
NCROE.prototype = {
    throttle: function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function() {
            previous = options.leading === false ? 0 : new Date().getTime();
            timeout = null;
            result = func.apply(context, args);
            context = args = null;
        };
        return function() {
            var now = new Date().getTime();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
                context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    },
    debounce: function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = new Date().getTime() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = new Date().getTime();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    }
};

NCROE.leftColModule = (function() {
    var ;

    //inherit properties from NCROE and set own properties
    var LeftCol = inherits(NCROE, {
        init: function() {}
    });

    var leftCol = new LeftCol();

    *//*leftColScroll*//*
    $.fn.leftColScroll = function(options) {
        var defaults = {},
            $this = $(this);

        options = $.extend({}, defaults, options);

        return $this.each(function() {

            var $obj = $(this);

            var ;

            function init() {
                updateVars();
                bindEvents();
            }

            function updateVars() {}

            function bindEvents() {}

            init();

        });
    };

    return leftCol;

})();//end of NCROE.leftColModule

*//*helpers*//*
//function for the inheritance
function inherits(Parent, ChildPrototype) {
    var Child = function(){};
    var F = function (){};

    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;

    $.extend(Child.prototype, ChildPrototype);

    return Child;
}*/
