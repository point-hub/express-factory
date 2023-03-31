export { faker } from "@faker-js/faker";
export default class Factory {
    constructor() {
        this.modelCount = 1;
        this.modelSequence = [];
        this.modelState = {};
    }
    count(modelCount) {
        this.modelCount = modelCount;
        return this;
    }
    sequence(modelSequence) {
        this.modelSequence = modelSequence;
        return this;
    }
    state(modelState) {
        this.modelState = modelState;
        return this;
    }
    useSequence() {
        const data = [];
        for (let i = 0; i < this.modelCount; i++) {
            const payload = this.definition();
            let sequence = {};
            if (this.modelSequence.length) {
                sequence = this.modelSequence[i % this.modelSequence.length];
            }
            data.push(Object.assign({}, this.useState(Object.assign(Object.assign({}, payload), sequence))));
        }
        return data;
    }
    useState(obj) {
        return Object.assign(Object.assign({}, obj), this.modelState);
    }
    make(count = 1) {
        this.count(count);
        if (this.modelCount === 1) {
            return this.makeOne();
        }
        return this.makeMany(count);
    }
    makeOne() {
        return this.useState(this.definition());
    }
    makeMany(count) {
        this.count(count);
        return this.useSequence();
    }
}
