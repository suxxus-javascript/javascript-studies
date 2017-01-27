const R = require('ramda');
const percentToFloat = R.compose(R.multiply(0.01), R.replace(/%/g, ''));
const removeCurrencySimbol = R.compose(Number, R.replace(/\$|€/g, ''));
const calcFinalPrice = R.curry((cost, savings) => cost - (cost * savings));
const getFinalPrice = (price, disc) =>
    R.compose(
        (fn) => fn(percentToFloat(disc)),
        (fn) => fn(removeCurrencySimbol(price))
    )(calcFinalPrice);

console.log(
    getFinalPrice('12$', '10%')
);
