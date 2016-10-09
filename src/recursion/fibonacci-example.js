'use strict';

// about:reader?url=http%3A%2F%2Fbenignbemine.github.io%2F2015%2F07%2F19%2Fes6-tail-calls%2F

// fibonacci
// Fn = (Xn - 1) + (Xn - 2)

var fibo = function(n) {

    if (n <= 1) {
        return n;
    }

    return fibo(n - 1) + fibo(n - 2);
};

var fibo2 = function r(n) {

    if (n <= 2) {
        return 1;
    }

    var val1 = r(n - 1);
    var val2 = r(n - 2);

    return val1 + val2;
};


var fibo3 = function r(n) {

    var a = 0;
    var b = 1;
    var f = 1;

    var i = 2;

    while (i <= n) {
        f = a + b;
        a = b;
        b = f;
        i += 1;
    }

    return f;
};

// We can call the fibIterRecursive implementation a recursive procedure -
// a function that calls itself, but does not have hidden information
// which the interpreter needs to keep track of.

// if the last thing that happens before the return statement is
// the invocation of a function which does not need to access any of
// the current local variables, the interpreter
// specified by ES6 will optimize that call by reusing the stack frame.

var fibo4 = function r(n, a, b) {

    if (n === 0) {
        return b;
    }

    return r(n - 1, a + b, a);
};

// 1 --> 1
// 2 --> 1
// 3 --> 2
// 4 --> 3
// 5 --> 5
// 6 --> 8
console.log(
    'fibo: ' + fibo(6) + '\n',
    'fibo2: ' + fibo2(6) + '\n',
    'fibo3: ' + fibo3(6) + '\n',
    'fibo4: ' + fibo4(6, 1, 0)
);
