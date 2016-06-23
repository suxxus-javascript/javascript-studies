'use strict';

//  It ensures that a function can only be called, well, once.
(function() {
    var once = function(fn) {
        var done = false;
        return function() {
            return done ? void 0 : ((done = true), fn.apply(null, arguments));
        };
    };

    var sayHelloOnlyOnce = once(function() {
        return 'Hello';
    });

    console.log(
        'Say Hello only once: ',
        sayHelloOnlyOnce(),
        sayHelloOnlyOnce(),
        sayHelloOnlyOnce()
    );

}());
