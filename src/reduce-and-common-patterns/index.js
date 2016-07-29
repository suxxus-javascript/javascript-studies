'use strict';

(function() {

    // https://egghead.io/lessons/javascript-introducing-reduce-common-patterns

    var data = [1, 2, 3, 4];

    var doubled = data.reduce(function(acc, value) {
        acc.push(value * 2);
        return acc;
    }, []);
    console.log('my doubled data', doubled);

    var doubledMapped = data.map(function(item) {
        return item * 2;
    }, []);
    console.log('my doubled mapped', doubledMapped);

    var data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    var evens = data2.reduce(function(acc, value) {
        if ((value % 2) === 0) {
            acc.push(value);
        }
        return acc;
    }, []);
    console.log('evens ', evens);

    var evensFiltered = data2.filter(function(item) {
        return (item % 2) === 0;
    });
    console.log('evens filtered ', evensFiltered);

    var filteredMapped = data2.filter(function(item) {
        return (item % 2) === 0;
    }).map(function(item) {
        return item * 2;
    });
    console.log('filtered mapped: ', filteredMapped);

}());
