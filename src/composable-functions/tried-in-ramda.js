const R = require('ramda');

const toNumber = str => Number(str);
const removeCurrencySimbol = (str) => str.replace(/$|€/g, '');
const removePercentSymbol = (str) => str.replace(/%/g, '');
const moveDecimals = (num) => num * 0.01;
const calcFinalPrice = (cost, savings) => cost - (cost * savings);
const moneyToFloat = R.pipe(
    removeCurrencySimbol,
    toNumber
);
const percentToFloat = R.pipe(
    removePercentSymbol,
    toNumber,
    moveDecimals
);
const appDisc = (price, discount) =>
    calcFinalPrice(moneyToFloat(price), percentToFloat(discount));

console.log(appDisc('10.55€', '10%'));
