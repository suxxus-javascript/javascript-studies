'use strict';

const { Map } = require('immutable-ext');
/*
  SEMIGROUPS
  a.concat(b).concat(c) is equivalent to a.concat(b.concat(c)) (associativity)

  1 + (1 + 1) === (1 + 1) + 1;
*/

// make a concat method

const Sum = function(x) {

    return {
        x: x,
        concat: function(o) {
            return Sum(x + o.x);
        },
        inspect: function() {
            return 'Sum(' + x + ')';
        }
    }

};

const sumResult = Sum(1)
    .concat(Sum(2))
    .concat(Sum(3));


console.log(sumResult)

const All = function(x) {

    return {
        x: x,
        concat: function(o) {
            return All(x && o.x);
        },
        inspect: function() {
            return 'All(' + x + ')';
        }
    }

};

const allResult = All(true)
    .concat(All(true));

console.log(allResult);

const First = function(x) {

    return {
        concat: function() {
            return First(x);
        },
        inspect: function() {
            return 'First(' + x + ')';
        }
    }

};

const firstResult = First('bla')
    .concat(First('?'));

console.log(firstResult);

const acc1 = Map({
    name: First('Nico'),
    isPaid: All(true),
    points: Sum(10),
    friends: ['Pili'],
});

const acc2 = Map({
    name: First('Nico'),
    isPaid: All(false),
    points: Sum(2),
    friends: ['Maria'],
});

console.log(acc1.concat(acc2).toJS());
