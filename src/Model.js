import _ from 'lodash'
import moment from 'moment'
import { Formatter } from 'sarala-json-api-data-formatter'
import QueryBuilder from './QueryBuilder'

const formatter = new Formatter()

export default class Model {
    constructor () {
        this.queryBuilder = new QueryBuilder()
        this.selfValidate()
        this.type = this.resourceName()
    }

    // override

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

    async request (config) {
        // to be implemented in base model
    }

    // requests

    async get () {
        const requestConfig = {
            method: 'GET',
            url: `${this.resourceUrl()}${this.queryBuilder.getQuery()}`
        }
        this.queryBuilder.reset()
        let response = await this.request(requestConfig)

        return this.respond(response.data)
    }

    async find (id) {
        const requestConfig = {
            method: 'GET',
            url: `${this.resourceUrl()}${id}${this.queryBuilder.getQuery()}`
        }
        this.queryBuilder.reset()
        let response = await this.request(requestConfig)

        return this.respond(response.data)
    }

    all () {
        return this.get()
    }

    async paginate (perPage = 10, page = 1) {
        this.queryBuilder.paginate(perPage, page)
        const requestConfig = {
            method: 'GET',
            url: `${this.resourceUrl()}${this.queryBuilder.getQuery()}`
        }
        this.queryBuilder.reset()
        let response = await this.request(requestConfig)

        return this.respond(response.data)
    }

    async save () {
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

    async delete () {
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
        const data = this.serialize(this.data())

        let respond = await this.request({
            url: `${this.links.self}/${relationship}`,
            method: 'PUT',
            data: data.data.relationships[relationship]
        })

        return this.respond(respond.data)
    }

    // modify query string

    with (resourceName) {
        this.queryBuilder.include(resourceName)

        return this
    }

    orderBy (column, direction = 'asc') {
        this.queryBuilder.orderBy(column, direction)

        return this
    }

    orderByDesc (column) {
        return this.orderBy(column, 'desc')
    }

    where (key, value = null, group = null) {
        this.queryBuilder.where(key, value, group)

        return this
    }

    filter (filter, group = null) {
        return this.where(filter, null, group)
    }

    limit (limit) {
        return this.where('limit', limit)
    }

    offset (offset) {
        return this.where('offset', offset)
    }

    select (fields) {
        if (_.isArray(fields)) {
            const selectFields = _.clone(fields)
            fields = {}
            fields[this.resourceName()] = selectFields
        }

        this.queryBuilder.select(fields)

        return this
    }

    // build model

    respond (response) {
        if (!_.isEmpty(response)) {
            let data = this.deserialize(response)

            if (this.isCollection(data)) {
                return this.resolveCollection(data)
            }

            return this.resolveItem(data)
        }

        return null
    }

    resolveCollection (data) {
        let resolved = {}

        if (data.hasOwnProperty('links')) {
            resolved.links = data.links
        }

        if (data.hasOwnProperty('meta')) {
            resolved.meta = data.meta
        }

        resolved.data = this.newCollection(_.map(data.data, item => {
            return this.resolveItem(item)
        }))

        return resolved
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

        _.forOwn(this.dates(), (format, field) => {
            model[field] = moment(data[field])
        })

        _.forEach(data.relationships, relationship => {
            let relation = model.relationships()[relationship]

            if (_.isUndefined(relation)) {
                throw new Error(`Sarale: Relationship ${relationship} has not been defined in ${model.constructor.name} model.`)
            }

            if (this.isCollection(data[relationship])) {
                model[relationship] = relation.resolveCollection(data[relationship])
            } else if (data[relationship].data) {
                model[relationship] = relation.resolveItem(data[relationship].data)
            }
        })

        _.forOwn(model.computed(), (computation, key) => {
            model[key] = computation(model)
        })

        return model
    }

    // extract data from model

    data () {
        let data = {}

        data.type = this.type

        if (this.hasOwnProperty('id')) {
            data.id = this.id
        }

        if (this.hasOwnProperty('relationshipNames')) {
            data.relationships = this.relationshipNames
        }

        _.forEach(this.fields(), field => {
            if (!_.isUndefined(this[field])) {
                data[field] = this[field]
            }
        })

        _.forOwn(this.dates(), (format, field) => {
            if (!_.isUndefined(this[field])) {
                data[field] = moment(this[field]).format(format)
            }
        })

        _.forEach(this.relationships(), (model, relationship) => {
            if (!_.isUndefined(this[relationship])) {
                if (_.isArray(this[relationship].data)) {
                    data[relationship] = {
                        data_collection: true,
                        data: _.map(this[relationship].data, relation => {
                            return relation.data()
                        })
                    }
                } else {
                    data[relationship] = {
                        data: this[relationship].data()
                    }
                }
            }
        })

        return data
    }

    // helpers

    resourceUrl () {
        return `${this.baseUrl()}/${this.resourceName()}/`
    }

    isCollection (data) {
        return data.hasOwnProperty('data_collection') && data.data_collection === true && _.isArray(data.data)
    }

    deserialize (data) {
        return formatter.deserialize(data)
    }

    serialize (data) {
        return formatter.serialize(data)
    }

    selfValidate () {
        const name = this.resourceName()

        if (name === null || !_.isString(name) || name.length === 0) {
            throw new Error(`Sarale: Resource name not defined in ${this.constructor.name} model. Implement resourceName method in the ${this.constructor.name} model to resolve this error.`)
        }
    }

    clone () {
        return _.cloneDeep(this)
    }

    newCollection (data) {
        return data
    }
}
