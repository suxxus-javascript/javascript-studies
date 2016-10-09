
/* eslint strict: [2, "never"] */

// We use the Bind () method primarily to call a function with the this
// value set explicitly. It other words, bind () allows us to easily set
// which specific object will be bound to this when a function or method is invoked.

GLOBAL.data = [{
    name: 'Ariel'
}];

var user = {
    data: [{
        name: 'John'
    }],
    showData: function(idx) {
        return (this.data[idx].name);
    }
};

var cars = {
    data: [{
        name: 'Mercedes'
    }]
};

var showData = user.showData;
cars.showData = user.showData.bind(cars);

// when we execute the showDataVar () function,
// the values printed to the console are from the global data array,
// not the data array in the user object.
// This happens because showDataVar () is executed as a global function
// and use of this inside showDataVar () is bound to the global scope,
console.log(
    '-------------------------\n',
    'should return Ariel\n',
    'values from the global data object\n',
    showData(0)
);

console.log(
    '-------------------------\n',
    'we can change the context\n',
    'should return John\n',
    showData.bind(user)(0)
);

console.log(
    '-------------------------\n',
    'Here we bind the user.showData method to the cars object we just created.​\n',
    'should return Mercedes\n',
    cars.showData(0)
);

// JavaScript’s Bind Allows Us to Curry(partial) a Function
var userTwo = function(occupation, name, age) {
    return 'name: ' + name + ' age: ' + age + ' occupation: ' + occupation;
};

var pre = userTwo.bind(null, 'engineer');
console.log(
    '-------------------------\n',
    'returns a new function with some of the arguments already set.\n',
    pre('John', 34)
);

// With the bind () method, we can explicitly set the this value for
// invoking methods on objects, we can borrow
// and copy methods, and assign methods to variable to be executed as functions.
var insideLoop = function() {
    var ln = 4;
    var i = 0;
    while (i < ln) {
        setTimeout(function(e) {
            console.log('i: ', e);
        }.bind(null, i), 1000);
        console.log('i= ', i);
        i += 1;
    }

};
console.log(
    '-------------------------\n',
    insideLoop()
    );

