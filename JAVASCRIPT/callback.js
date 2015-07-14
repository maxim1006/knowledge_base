function makeCallback(num1, num2, callback) {
    var num = num1+num2;
    console.log('start');
    callback(num);
}

makeCallback(1,2, function(num) {
    console.log('end ' + num);
});