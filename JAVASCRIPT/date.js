var today = new Date();

var days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
var months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
var monthsNumber = today.getMonth();
var year = today.getFullYear();
var daysNumber = today.getDate();
var dayNumber = today.getDay();
var monthsNumberUTC = monthsNumber;
monthsNumberUTC++;

console.log(daysNumber + '.' + monthsNumberUTC + '.' + year);
console.log(days[dayNumber] + ',' + ' ' + daysNumber + ' ' + months[monthsNumber] + ', ' + year + ' года');
