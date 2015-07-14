//var pattern = new RegExp('\w+', 'gim');
var pattern = /\w+/g; //better use

var string = "How we     survive makes,    us what we  are";
// console.log(string.match(pattern)); //.match - один параметр на выходе массив всех совпадений

// console.log(string.search(pattern)); //игнорирует класс глобал и всегда возвращает индекс первого совпадения, если ничего не найдено вернется -1

// console.log(string.split(/[\s,]+/)); // разделяю строку по символам, каким захочу
// var a = string.split(/[\s]+/);

// console.log(a.join(' '));




// var b = string.replace(/\s+/g, ' '); // можно заменить чем-то какие-то символы, а можно сделать и функцию:
// console.log(b);

// var b = string.replace(/(\w+)/, function(match, value) {
//     console.log(match);
//     console.log(value);
//     return match + 'Max';
// }); //match - аргумент, соответствует строке, которую необходимо преобразовать value - значение первой запоминающей группы
// console.log(b);


//Свойства объекта Regexp - только для чтения
// console.log(pattern.global);
// console.log(pattern.multiline);
// console.log(pattern.ignoreCase);
// console.log(pattern.lastIndex);



// var pattern2 = /\w+@\w+\.\w+/g,
//     string2 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, max@list.ru laboriosam, quidem magnam laborum impedit quas aspernatur voluptates distinctio eius reprehenderit sapiente eaque accusamus rem iusto modi quae vitae minus praesentium.';

// console.log(pattern2.test(string2));
// console.log(pattern2.test(string2));//так как есть флаг global, то второй вызов метода test = false, если его нет, то lastIndex всегда равен 0


// console.log(pattern.lastIndex);
// console.log(pattern.exec(string)); //если не стоит флаг global, то метод exec = методу match, а вот если стоит, то будет меняться свойство lastIndex => при вызовах exec(), будет меняться индекс вхождения.
// console.log(pattern.lastIndex);
// console.log(pattern.exec(string));
// console.log(pattern.exec(string));
// console.log(pattern.exec(string));

//Поэтому использую exec() так и нахожу все индексы вхождений:
// var match;
// while(match = pattern.exec(string)) {
//     console.log(match[0] + " (Index: " + match.index + ')');
// }

//ищу все вхождения emailов
// var pattern3 = /(\w+)@(\w+\.\w+)/g,
//     string3 = 'ываджпыдвлаоп двалпдывоап max@list.ru lasdkjflaskjfd;lajksdf aliya@mail.ru',
//     match;

// while(match = pattern3.exec(string3)) {
//     console.log('Name:' + match[1] + ' ' + 'Domain:' + match[2]);
// }