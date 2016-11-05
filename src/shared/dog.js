/* eslint-disable import/no-extraneous-dependencies */
export default class {
    constructor(name) {
        this.name = name;
    }
    bark() {
        return `Wah wah, I am ${this.name}`;
    }
}

// module.exports = Dog;