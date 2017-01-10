'use strict';

var right = function(value) {

    return {

        map: function(fn) {

            return right(fn(value));

        },

        fold: function(fn, fng) {

            return fng(value);

        },

        inspect: function() {

            return 'right(' + value + ')';

        }

    };

};

var left = function(value) {

    return {

        map: function() {

            return left(value);

        },

        fold: function(fn) {

            return fn(value);

        },

        inspect: function() {

            return 'left(' + value + ')';

        }

    };

};

var fromNullable = function(value) {

    return value ? right(value) : left();

};

var findColour = function(name) {

    var colours = {

        red: '#ff00',
        blue: '#065CFF',
        yellow: '#E8FF05'

    };

    return fromNullable(colours[name]);

};

var result = findColour('red')
    .map(function(value) {

        return value.slice(1);
    })
    .fold(

        function() {
            return 'no color found';
        },

        function(value) {
            return value.toUpperCase();
        });


console.log(result);
