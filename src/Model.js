import axios from 'axios';
import collect from 'collect.js';
import Jsona from 'jsona';
import _ from 'lodash';
import moment from 'moment';

import Ioc from './Ioc';
import QueryBuilder from './QueryBuilder';

let ioc = new Ioc();

export class Model
{
    constructor (attributes = {}) {
        this.fields = [];
        this.dates = [];
        this.attributes = attributes;
        this.baseUrl = '/api';
        this.queryBuilder = new QueryBuilder();
        ioc.register(this);

        return new Proxy(this, {
            get: (model, attribute, receiver) => {
                return this.getAttribute(attribute);
            }
        });
    }

    getAttribute(attribute) {
        let model = this;
        const skip = ['__ob__', 'constructor'];

        if (_.indexOf(skip, attribute) === -1) {
            if (_.indexOf(['id', 'type'], attribute) != -1) return this.attributes[attribute];

            if (_.indexOf(this.fields, attribute) != -1) return this.attributes[attribute];

            if (this.attributes.relationshipNames && this.attributes.relationshipNames.length && (_.indexOf(this.attributes.relationshipNames, attribute) != -1)) {
                if (! (attribute in model)) {
                    throw new Error(`Relationship ${attribute} is not defined in ${this.constructor.name}`);
                }

                model[attribute]();

                if (_.isArray(this.attributes[attribute])) {
                    return this.resolveCollection(this.attributes[attribute]);
                }

                return this.resolveItem(this.attributes[attribute])
            }

            const accessor = this.getAccessorName(attribute);

            if (accessor in model) {
                if (this.attributes[attribute]) return model[accessor](this.attributes[attribute]);

                return model[accessor]();
            }

            if (_.indexOf(this.dates, attribute) != -1) return moment(this.attributes[attribute]);
        }

        return model[attribute];
    }

    getAccessorName(attribute) {
        return `get${_.replace(_.startCase(attribute), ' ', '')}Attribute`;
    }

    async all() {
        let response = await axios.get(this.getUrl());

        return this.resolveCollection(this.deserialize(response.data));
    }

    with(resourceName) {
        this.queryBuilder.include(resourceName);

        return this;
    }

    getUrl() {
        return `${this.baseUrl}/${this.attributes.type}${this.queryBuilder.getQuery()}`
    }

    deserialize (data) {
        const dataFormatter = new Jsona();

        return dataFormatter.deserialize(data);
    }

    resolveCollection (data) {
        let thiss = this;

        return collect(data).map(item => thiss.resolveItem(item)).all();
    }

    resolveItem (item) {
        return ioc.resolve(item);
    }

    hasMany(model) {
        return this.relationship('hasMany', model);
    }

    hasOne(model) {
        return this.relationship('hasOne', model);
    }

    relationship(type, model) {
        return {
            type: type,
            model: new model()
        }
    }
}