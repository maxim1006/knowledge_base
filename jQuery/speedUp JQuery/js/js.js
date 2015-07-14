/**
*    для увеличения скорости при вставке в DOM делаю 2 вещи:
*    1) Сперва формирую вставку, а только потом вставляю
*    2) Обертываю вставляемые элементы в див
*
*    для увеличения скорости работы с селекторами делаю 2 вещи:
*    1) пишу минимум классов в обертку, тк sizzle - сервер, который у jQuery обрабатывает $объекты,
*     читает справа налево, поэтому $('.menu-item') гораздо производительнее чем $('.menu .menu-item')
*    2) Если есть id, то пишу так $('#id').find('.class'), так как у jQuery есть спец. оптимизация 
*    этого момента.
*/

$(function() {

    var str
    , arr;

    function init() {
        updateVars();
        bindEvents();
    }

    function updateVars() {
        str = '';
        arr = [];
    }

    function bindEvents() {

        var arrLength = 1000;

        //проверка со строкой - самый быстрый
        console.time('1000 items');
        for (var i = 0; i < arrLength; i++) {
            str += '<div>' + arr.push(i) + '</div>';
        }
        $('.page').append('<div>' + str + '</div>');
        console.timeEnd('1000 items');

        //проверка вставки сразу
        // console.time('1000 items');
        // for (var i = 0; i < arrLength; i++) {
        //     str = '<div>' + arr.push(i) + '</div>';
        //     $('.page').append(str);
        // }
        // console.timeEnd('1000 items');

        //проверка вставки array
        // console.time('1000 items');
        // for (var i = 0; i < arrLength; i++) {
        //     arr.push('<div>' + i + '</div>');
        // }

        // $('.page').append('<div>' + arr.join('') + '</div>');
        // console.timeEnd('1000 items');
    }

    init();

});