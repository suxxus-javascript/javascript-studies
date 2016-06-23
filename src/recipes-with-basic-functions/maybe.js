 'use strict';
 // A function fn takes a value as a parameter,
 // and its behaviour by design is to do nothing
 // if the parameter is nothing

 (function() {

     var maybe = function(fn) {
         return function() {

             var slice = [].slice;
             var args = slice.call(arguments);

             var isNull = function(value) {
                 return value === null;
             };

             var doNothing = function() {};
             var doSomething = function() {
                 return fn.apply(null, args);
             };

             var action = args.some(isNull) ? doNothing : doSomething;

             return action();
         };
     };


     console.log(

         'should be 6: ',

         maybe(function(a, b, c) {
             return a + b + c;
         })(1, 2, 3) === 6

     );

     console.log(

         'should be undefined: ',

         maybe(function(a, b, c) {
             return a + b + c;
         })(1, null, 3) === void 0

     );

 }());
