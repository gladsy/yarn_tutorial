/* eslint-disable import/no-extraneous-dependencies */

const str ='ES6';
console.log(`Hello ${str}`);

// const Dog = require('./dog');
import Dog from '../shared/dog';
const toby = new Dog('Toby');
console.log(toby.bark());
