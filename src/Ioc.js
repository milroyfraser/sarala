let instance = null;

export default class Ioc
{
    constructor() {
        if (! instance) {
            this.registry = {};
            instance = this;
        }
    }

    register(model) {
        if (! this.registry[model.attributes.type]) {
            this.registry[model.attributes.type] = model.constructor;
        }
    }

    resolve(data) {
        return new this.registry[data.type](data);
    }
}