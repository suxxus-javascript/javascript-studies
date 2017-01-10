'use strict';

var box = function(x) {

    return {

        map: function(fn) {

            return box(fn(x));

        },

        fold: function(fn) {

            return fn(x);
        },

        inspect: function() {

            return 'box(' + x + ')';

        }

    };

};

var moneyToFloat = function(str) {

    return box(str.replace(/$/g, ''))
        .map(function(replaced) {

            return parseFloat(replaced);

        });

};

var percentToFloat = function(str) {

    return box(str.replace(/%/g))
        .map(function(replaced) {

            return parseFloat(replaced);

        })
        .map(function(num) {

            return num * 0.01;

        });

};

var applyDiscount = function(price, discount) {

    return moneyToFloat(price)
        .fold(function(cost) {

            return percentToFloat(discount)
                .fold(function(savings) {

                    return cost - (cost * savings);

                });

        });

};

console.log('moneyToFloat--> ', moneyToFloat('1.24$'));
console.log('percentToFloat--> ', percentToFloat('20%'));
console.log('applyDiscount--> ', applyDiscount('1.24$', '10%'));
