var elements = document.querySelectorAll("div"),
    callback = (el) => { console.log(el); };

// Spread operator
[...elements].forEach(callback);

// Array.from()
Array.from(elements).forEach(callback);

// for...of statement
for (var div of elements) callback(div);