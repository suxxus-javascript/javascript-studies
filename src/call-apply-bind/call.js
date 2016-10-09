'use strict';

// functions comes with a built-in call method
// for providing a custom receiver.
var foo = function() {
    return arguments;
};

console.log(
    '------------------------\n',
    'foo => ', foo(1, 2, 3, 4, 5)
);

// invoking a function via it's call method
// behaves similarly to calling it directly
// except that the first argument provides
// an explicit receiver object
console.log(
    '-----------------------\n',
    'foo.call =>', foo.call(null, 1, 2, 3, 4, 5)
);

// the call method comes in handy for calling methods
// that may have been removed, modified, or overriden
var dict = Object.create(null, {
    name: {
        value: 'albert'
    },
    age: {
        value: '25'
    },
    id: {
        value: 'ap25'
    }
});

var hasOwnProperty = {}.hasOwnProperty;
console.log(
    '-----------------------\n',
    'dict.hasOwnProperty =>', dict.hasOwnProperty
);

console.log(
    '-----------------------\n',
    'dic hasOwnProperty name =>', hasOwnProperty.call(dict, 'name')
);

console.log(
    '-----------------------\n', [].slice.call({
        '0': 'a',
        '1': 'b',
        length: 2
    }, 0)
);

console.log(
    '-----------------------\n', ['a', 'b'].slice(0)
);

// the call method is useful when defining
// higher - orderer functions
var table = {
    entries: [],
    addEntry: function(key, value) {
        this.entries.push({
            key: key,
            value: value
        });
    },
    forEach: function(f, thisArg) {
        var entries = this.entries;
        var entry;
        for (var i = 0, n = entries.length; i < n; i++) {
            entry = entries[i];
            f.call(thisArg, entry.key, entry.value, i);
        }
    }
};
// this allows consumers of the object to use
// a method as the callback function of `table.forEach`
// and provide a sensible receiver for the method
//
//   '-----------------------\n',
table.addEntry('name', 'foo');
var table2 = {
    entries: []
};
var table3 = {
    entriesTable3: []
};

table.forEach(table.addEntry, table2)
table.forEach(function(key, value, i) {
    var x = {}
    x[key] = value;
    this.entriesTable3[i] = x;
}, table3)

console.log('table => ', table.entries);
console.log('table2 => ', table2);
console.log('table3 => ', table3);



