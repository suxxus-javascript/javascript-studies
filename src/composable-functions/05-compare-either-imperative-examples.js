const Right = (value) => ({

    chain: (fn) => fn(value),
    map: (fn) => Right(fn(value)),
    fold: (fn, fng) => fng(value),
    inspect: () => `Right(${value})`,

});


const Left = (value) => ({

    chain: (fn) => fn(value),
    map: (fn) => Left(value),
    fold: (fn) => fn(value),
    inspect: () => `Left(${value})`,

});

const fromNullable = (value, R, L) => value ? R(value) : L();

//----------------------------------------------------------------------------------------------------

const renderPage = function() {

    console.log('render page');

};

const showLogin = function() {

    console.log('show login');

};

(function(currentUser) {

    if (currentUser) {

        renderPage();

    } else {

        showLogin();

    }

}('admin'));

(function(currentUser) {

    fromNullable(currentUser, Right, Left)
        .fold(showLogin, renderPage);

}('admin'));

//----------------------------------------------------------------------------------------------------

const loadPrefs = function(prefs) {

    console.log('prefs ---> ', prefs);

};

const defaultPrefs = function() {

    console.log('default preferences');

};

(function(user) {

    if (user.type === 'premium') {

        loadPrefs(user.preferences);

    } else {

        defaultPrefs();

    }

}({
    type: 'premium',
    preferences: {
        sports: 'soccer'
    }
}));

(function(user) {

    (user.type === 'premium' ? Right(user) : Left('not premium'))
    .map((u) => u.preferences)
        .fold(defaultPrefs, (prefs) => loadPrefs(prefs));

}({
    type: 'premium',
    preferences: {
        sports: 'tennis'
    }
}));

//----------------------------------------------------------------------------------------------------

const userOne = {

    address: {

        street: {
            name: 'Gran Via 46'
        }

    }

};

(function() {

    const streetName = function(user) {

        const address = user.address;

        if (address) {

            const street = address.street;

            if (street) {

                return street.name;

            }

        }

        return 'no street';
    };

    console.log('---> ', streetName(userOne));

}());

(function(user) {

    const streetName = () => fromNullable(user, Right, Left)
        .chain((u) => fromNullable(u.address, Right, Left))
        .chain((s) => fromNullable(s.street, Right, Left))
        .map((r) => `user street name is: ${r.name}`)
        .fold(() => 'no street', (n) => n);

    console.log(streetName());

}(userOne));
//----------------------------------------------------------------------------------------------------

(function() {

    const concatUniq = function(x, ys) {

        const found = ys.filter((y) => y === x)[0];
        return found ? ys : ys.concat(x);

    };

    console.log(concatUniq('a', ['b', 'a']));

}());

(function() {

    const concatUniq = (x, ys) =>
        fromNullable(ys.filter((y) => y === x)[0], Right, Left)
        .fold(() => ys.concat(x), (v) => v);

    console.log(concatUniq('x', ['b', 't']));

}());
