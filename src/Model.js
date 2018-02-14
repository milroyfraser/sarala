import _ from 'lodash'
import moment from 'moment'
import { Formatter } from 'sarala-json-api-data-formatter'
import QueryBuilder from './QueryBuilder'

const formatter = new Formatter()

export default class Model {
    constructor () {
        this.queryBuilder = new QueryBuilder()
    }

    fields () {
        return []
    }

    dates () {
        return []
    }

    relationships () {
        return {}
    }

    computed () {
        return {}
    }

    resourceName () {
        return null
    }

    baseUrl () {
        return '/api'
    }

    dateFormat () {
        return 'YYYY-MM-DD HH:mm'
    }

    resourceUrl () {
        return `${this.baseUrl()}/${this.resourceName()}/`
    }

    async find (id) {
        let response = await this.request({
            url: `${this.resourceUrl()}${id}${this.queryBuilder.getQuery()}`,
            method: 'GET'
        })

        return this.respond(response.data)
    }

    async all () {
        let response = await this.request({
            url: `${this.resourceUrl()}${this.queryBuilder.getQuery()}`,
            method: 'GET'
        })

        return this.respond(response.data)
    }

    async paginate (perPage = null, page = null) {
        this.queryBuilder.paginate(perPage, page)

        let response = await this.request({
            url: `${this.resourceUrl()}${this.queryBuilder.getQuery()}`,
            method: 'GET'
        })

        return this.respond(response.data)
    }

    async save (data = {}, pivot = null) {
        if (this.hasOwnProperty('id') && data.hasOwnProperty('id') && data.hasOwnProperty('type')) {
            this.attach(data, pivot)
        }

        if (this.hasOwnProperty('id')) {
            return this.update()
        }

        return this.create()
    }

    async create () {
        let response = await this.request({
            url: this.resourceUrl(),
            method: 'POST',
            data: this.serialize(this.data())
        })

        return this.respond(response.data)
    }

    async update () {
        let response = await this.request({
            url: this.links.self,
            method: 'PUT',
            data: this.serialize(this.data())
        })

        return this.respond(response.data)
    }

    delete () {
        let response = this.request({
            url: this.links.self,
            method: 'DELETE'
        })

        return this.respond(response.data)
    }

    async attach (model, data = null) {
        let config = {
            url: `${this.links.self}/${model.type}/${model.id}`,
            method: 'POST'
        }

        if (data) {
            config.data = data
        }

        let response = await this.request(config)

        return this.respond(response.data)
    }

    async detach (model) {
        let response = await this.request({
            url: `${this.links.self}/${model.type}/${model.id}`,
            method: 'DELETE'
        })

        return this.respond(response.data)
    }

    async sync (relationship) {
        const data = this.serialize(this.data()[relationship])

        let respond = await this.request({
            url: `${this.links.self}/${relationship}`,
            method: 'PUT',
            data: data
        })

        return this.respond(respond.data)
    }

    async request (config) {
        // to be implemented in base model
    }

    respond (response) {
        let data = this.deserialize(response)

        if (this.isCollection(data)) {
            return this.resolveCollection(data)
        }

        return this.resolveItem(data)
    }

    with (resourceName) {
        this.queryBuilder.include(resourceName)

        return this
    }

    deserialize (data) {
        return formatter.deserialize(data)
    }

    isCollection (data) {
        return data.hasOwnProperty('data_collection') && data.data_collection === true && _.isArray(data.data)
    }

    serialize (data) {
        return formatter.serialize(data)
    }

    resolveCollection (data) {
        let thiss = this

        return _.map(data.data, item => {
            return thiss.resolveItem(item)
        })
    }

    resolveItem (data) {
        return this.hydrate(data)
    }

    hydrate (data) {
        let model = _.clone(this)

        model.id = data.id
        model.type = data.type

        if (data.hasOwnProperty('relationships')) {
            model.relationshipNames = data.relationships
        }

        if (data.hasOwnProperty('links')) {
            model.links = data.links
        }

        _.forEach(this.fields(), field => {
            model[field] = data[field]
        })

        _.forEach(this.dates(), field => {
            model[field] = moment(data[field])
        })

        const thiss = this;

        _.forEach(data.relationships, relationship => {
            let relation = model.relationships()[relationship]

            if (!relation) {
                throw new Error(`Sarale: Relationship ${relationship} has not been defined in ${model.constructor.name} model.`)
            }

            if (thiss.isCollection(data[relationship])) {
                model[relationship] = relation.resolveCollection(data[relationship])
            } else {
                model[relationship] = relation.resolveItem(data[relationship].data)
            }
        })

        _.forOwn(model.computed(), (computation, key) => {
            model[key] = computation(model)
        })

        return model
    }

    data () {
        let data = {}

        data.id = this.id
        data.type = this.type

        if (this.hasOwnProperty('relationshipNames')) {
            data.relationships = this.relationshipNames
        }

        _.forEach(this.fields(), field => {
            data[field] = this[field]
        })

        _.forEach(this.dates(), field => {
            data[field] = this[field].format(this.dateFormat())
        })

        let thiss = this

        _.forEach(thiss.relationships(), (model, relationship) => {
            if (! _.isUndefined(thiss[relationship])) {
                if (_.isArray(thiss[relationship])) {
                    data[relationship] = {
                        data_collection: true,
                        data: _.map(thiss[relationship], relation => {
                            return relation.data()
                        })
                    }
                } else {
                    data[relationship] = {
                        data: thiss[relationship].data()
                    }
                }
            }
        })

        return data
    }
}
