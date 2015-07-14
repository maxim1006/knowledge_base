//Эмуляция кроссбраузерного метода

function bind(func, context) {
  return function() { 
    return func.apply(context, arguments); 
  };
}

function f(name) {
  console.log(this.name);
  console.log(name ? name:'нет имени');
}

var user = { name: "Вася" };

//метод с call
f.call(user, 'Aliya');

//метод с apply
f.apply(user, ['Max']);

//кроссбраузерный метод
bind(f, user)();

//современный метод
var f2 = f.bind(user);
f2(); // выполнит f с this = user


//jQuery Proxy
// $(function() {
//     var myObj = {
//       message: 'hello',
//       alertMessage: function(){
//           // переменная this ссылается на объект myObj, 
//           // а не на элемент, по которому кликнули
//           console.log(this.message);
//           return false;
//       }
//   };

//   $('div').click($.proxy(myObj.alertMessage, myObj));
// });
