const R = require('ramda');


/* if else */

// ex 1

// imparative
((currentUser) => {

    if (currentUser) {

        return 'render page';

    } else {

        return 'show login';

    }

})('admin');

// fp
((currentUser) =>
    R.ifElse(
        R.isNil,
        R.always('show login'),
        R.always('render page'),
    )(currentUser))();

// ex 2

// imperative
((user) => {

    if (user.type === 'premium') {

        return loadPreferences(Object.assign({}, user.preferences));

    } else {

        return defaultPrefs();

    }

})({
    type: 'premium',
    preferences: {
        sports: 'soccer'
    }
});

// fp
((user) =>
    R.ifElse(
        R.propEq('type', 'premium'),
        R.compose(R.toString, R.prop('preferences')),
        R.always('default preferences')
    )(user)
)({
    type: 'premium',
    preferences: {
        sports: 'rugby'
    }
});


/* either */

// imperative
((user) => {
    const address = user.address;
    if (address) {
        const street = address.street;
        if (street) {
            return street.name;
        }
    }
    return 'no street name';
})({
    address: {
        street: {
            name: 'Gran Via 46'
        }
    }
});

// fp
((user) => {
    return R.either(
        R.path(['address', 'street', 'name']),
        R.always('no street name')
    )(user)
})({
    address: {
        street: {
            name: 'Gran Via 48'
        }
    }
});

/* maybe */
const maybe = (f) =>
    (...args) => {

        const isNothing = (x) => x === null || x === void 0;
        const doNothing = () => null;
        const doSomething = () => f.apply(null, args);

        return args
            .some(isNothing) ? doNothing() : doSomething();
    };

const Maybe = (f) =>
    (...args) =>
    R.ifElse(
        R.any(R.isNil),
        R.always(null),
        R.apply(f)
    )(args);

// ex 1
const sumAll = (...args) => R.reduce(R.add, 0, args);

const suma = maybe(sumAll);
const Suma = Maybe(sumAll);

console.log('maybe: ', suma(1, 2, 4),
    '\n-------------\n',
    'Maybe: ', Suma(5, null, 7));


// ex 2
const ob = {
    addresses: [{ street: 'gran via' }],
}

const streetNameI = (function(value) {

    var addresses = value.addresses;

    if (!Array.isArray(value.addresses) ||
        !value.addresses[0] ||
        !value.addresses[0].hasOwnProperty('street')) {

        return 'no result';

    }

    var streetName = addresses[0]['street']
        .toUpperCase();

    return `your result is: ${streetName}`;

})(ob);

const streetName = R.compose(
    R.either(
        Maybe(
            R.compose(
                (x) => `your result is: ${x}`,
                R.toUpper
            )
        ),
        R.always('no result')
    ),
    R.view(
        R.lensPath(['addresses', 0, 'street'])
    )
)(ob);

const streetNameOp2 = ((value) => {

    const streetLenses = R.view(R.lensPath(['addresses', 0, 'street'])),
        faultMessage = R.always('no result'),
        successMessage = R.compose(R.append(R.__, ['your result is: ']), R.toUpper),
        getMsg = R.either(Maybe(successMessage), faultMessage);

    return R.compose(getMsg, streetLenses)(value);

})(ob);

/**/

const data = [{
    name: "Jamestown",
    population: 2047,
    temperatures: [-34, 67, 101, 87]
}, {
    name: "Awesome Town",
    population: 3568,
    temperatures: [-3, 4, 9, 12]
}, {
    name: "Funky Town",
    population: 1000000,
    temperatures: [75, 75, 75, 75, 75]
}];

const temperaturesAndPopulation = (function() {

    var coords = [],
        totalTemperature = 0,
        averageTemperature = 0;

    for (var i = 0; i < data.length; i++) {
        totalTemperature = 0;

        for (var j = 0; j < data[i].temperatures.length; j++) {
            totalTemperature += data[i].temperatures[j];
        }

        averageTemperature = totalTemperature / data[i].temperatures.length;

        coords.push([averageTemperature, data[i].population]);
    }

    return coords;

})();

const average = (xs) => R.compose(
    R.divide(R.__, R.length(xs)),
    R.sum
)(xs);

const temperatureCoords = R.compose(
    R.zip(R.__, R.pluck('population', data)),
    R.map(average),
    R.pluck('temperatures')
)(data);
// => [[55.25, 2047], [5.5, 3568], [75, 1000000]]
