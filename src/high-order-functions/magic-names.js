'use strict';

(function() {
    // magic names this and arguments have a different behaviour
    // when you invoke a function that was defined with a fat arrow:
    // Instead of being bound when the function is invoked

    var foo = (function() {
        return arguments[0];
    }(2));
    console.log('foo should be: 2', foo === 2);

    var baaz = (function() { arguments[0] })(2);

    console.log('baaz should be: 1', baaz === 1);

}(1));
