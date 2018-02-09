import _ from 'lodash';
import moment from 'moment';
import { Formatter } from 'sarala-json-api-data-formatter';
import QueryBuilder from './QueryBuilder';

const formatter = new Formatter();

export default class Model
{
    constructor () {
        this.queryBuilder = new QueryBuilder();
    }

    fields () {
        return [];
    }

    dates () {
        return [];
    }

    relationships () {
        return {};
    }

    computed () {
        return {};
    }

    resourceName () {
        return null;
    }

    baseUrl () {
        return '/api';
    }

    dateFormat () {
        return 'YYYY-MM-DD HH:mm'
    }

    resourceUrl () {
        return `${this.baseUrl()}/${this.resourceName()}/`;
    }

    async all () {
        let response = await this.request({
            url: `${this.resourceUrl()}${this.queryBuilder.getQuery()}`,
            method: 'GET'
        });

        return this.respond(response.data);
    }

    async find (id) {
        let response = await this.request({
            url: `${this.resourceUrl()}${id}${this.queryBuilder.getQuery()}`,
            method: 'GET'
        });

        return this.respond(response.data);
    }

    async save (data = {}, pivot = null) {
        if (this.id && data.id && data.type) {
            this.attach(data, pivot);
        }

        if (this.id) {
            return this.update();
        }

        return this.create();
    }

    async create () {
        let response = await this.request({
            url: this.resourceUrl(),
            method: 'POST',
            data: this.serialize(this.data())
        });

        return this.respond(response.data);
    }

    async update () {
        let response = await this.request({
            url: `${this.baseUrl()}${this.links.self}`,
            method: 'PUT',
            data: this.serialize(this.data())
        });

        return this.respond(response.data);
    }

    delete () {
        return this.request({
            url: `${this.baseUrl()}${this.links.self}`,
            method: 'DELETE'
        });

        return this.respond(respond.data);
    }

    async attach (model, data = null) {
        let config = {
            url: `${this.baseUrl()}${this.links.self}/${model.type}/${model.id}`,
            method: 'POST'
        };

        if (data) {
            config.data = data;
        }

        let response = await this.request(config);

        return this.respond(response.data);
    }

    async detach (model) {
        let response = await this.request({
            url: `${this.baseUrl()}${this.links.self}/${model.type}/${model.id}`,
            method: 'DELETE'
        });

        return this.respond(response.data);
    }

    async sync (relationship) {
        const data = this.serialize(this.data()[relationship]);

        let respond = await this.request({
            url: `${this.baseUrl()}${this.links.self}/${relationship}`,
            method: 'PUT',
            data: data
        });

        return this.respond(respond.data);
    }

    async request (config) {
        // to be implemented in base model
    }

    respond (response) {
        let data = this.deserialize(response);

        if (_.isArray(data)) {
            return this.resolveCollection(data);
        }

        return this.resolveItem(data);
    }

    with (resourceName) {
        this.queryBuilder.include(resourceName);

        return this;
    }

    deserialize (data) {
        return formatter.deserialize(data);
    }

    serialize (data) {
        return formatter.serialize(data);
    }

    resolveCollection (data, parent = null) {
        let thiss = this;

        return _.map(data, item => thiss.resolveItem(item, parent));
    }

    resolveItem (data, parent = null) {
        return this.hydrate(data, parent);
    }

    hydrate (data, parent = null) {
        let model = _.clone(this);

        model.id = data.id;
        model.type = data.type;

        if (data.relationships) {
            model.relationshipNames = data.relationships;
        }

        model.links = {
            self: `/${data.type}/${data.id}`
        };

        if (parent) {
            model.links.self = `/${parent.resourceName()}/${parent.id}${model.links.self}`;
        }

        _.forEach(this.fields(), field => {
            model[field] = data[field];
        });

        _.forEach(this.dates(), field => {
            model[field] = moment(data[field]);
        });

        _.forEach(data.relationships, relationship => {
            let relation = model.relationships()[relationship];

            if (! relation) {
                throw new Error(`Relationship ${relationship} is not defined in ${relation.constructor.name}`);
            }

            if (_.isArray(data[relationship])) {
                model[relationship] = relation.resolveCollection(data[relationship], model);
            } else {
                model[relationship] = relation.resolveItem(data[relationship], model);
            }
        });

        _.forOwn(model.computed(), (computation, key) => {
            model[key] = computation(model);
        });

        return model;
    }

    data () {
        let data = {};

        data.id = this.id;
        data.type = this.type;

        if (this.relationshipNames) {
            data.relationships = this.relationshipNames;
        }

        _.forEach(this.fields(), field => {
            data[field] = this[field];
        });

        _.forEach(this.dates(), field => {
            data[field] = this[field].format(this.dateFormat());
        });

        let thiss = this;

        _.forEach(thiss.relationships(), (model, relationship) => {
            if (_.isArray(this[relationship])) {
                data[relationship] = _.map(this[relationship], relation => {
                    return relation.data();
                });
            } else {
                data[relationship] = this[relationship].data();
            }
        });

        return data;
    }
}