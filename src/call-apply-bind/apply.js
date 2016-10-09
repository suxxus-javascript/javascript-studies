'use strict';

// the apply method takes an array of arguments and calls the function
// as if each element of the array where individual
var foo = function() {
    return arguments;
};

console.log(
    '-------------------------\n',
    'pass arguments to foo("a","b","c")\n',
    foo('a', 'b', 'c')
);

console.log(
    '-------------------------\n',
    'pass arguments as a list to foo.apply(null,["a","b","c"])\n',
    foo.apply(null, ['a', 'b', 'c'])
);

console.log(
    '-------------------------\n',
    'pass a list to Math.max [1, 2, 5, 6]\n',
    Math.max.apply(null, [1, 2, 5, 6])
);

var average = function() {
    return [].reduce.call(arguments, function(acc, value) {
        return acc + value;
    }) / arguments.length;
};

console.log(
    '-------------------------\n',
    '[12, 98, 64] average = 58\n',
    average.apply(null, [12, 98, 64])
);

// in addition to the array of arguments, the apply method
// takes a first argument that specify the binding of this for
// the function is called
var ob = {
    scores: [],
    setScores: function() {
        var n = arguments.length;
        var i = 0;
        while (i < n) {
            this.scores.push(arguments[i]);
            i += 1;
        }
    }
};

var ob2 = {
    scores: []
};
ob.setScores(1, 3, 4);

console.log(
    '-------------------------\n',
    'ob scores',
    ob.scores
);

// pass a list
ob.setScores.apply(ob, [5, 6, 7]);

console.log(
    '-------------------------\n',
    'ob scores',
    ob.scores
);

ob.setScores.apply(ob2, ['a', 'b', 'c']);
console.log(
    '-------------------------\n',
    'ob2 scores (ob.scores borrowed - binding of ob2 -)\n',
    ob2.scores
);
