const R = require('ramda');
const colours = {

    red: '#ffCC00',
    blue: '#065cff',
    yellow: '#e8ff05'

};
const colourErrorMsg = R.always('colour not found');
const replaceAndToUpper = R.compose(
    R.toUpper,
    R.replace('#', '')
);
const findColour = (colour) =>
    R.ifElse(
        R.isNil,
        colourErrorMsg,
        replaceAndToUpper
    )(colour);

console.log(

    findColour(colours['blue']);

);
