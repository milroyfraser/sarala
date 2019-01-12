import {
    indexOf,
    isNull,
    isUndefined,
    isObject,
    forOwn,
    isEmpty
} from 'lodash'

export default class QueryBuilder {
    constructor () {
        this.reset()
    }

    reset () {
        this.query = ''
        this.includes = []
        this.sort = []
        this.filters = {}
        this.fields = {}
        this.pagination = {}
    }

    include (resourceName) {
        if (!this.includes[resourceName]) {
            this.includes.push(resourceName)
        }
    }

    paginate (perPage, page) {
        this.pagination = {
            size: perPage,
            number: page
        }
    }

    orderBy (column, direction) {
        if (indexOf(['asc', 'desc'], direction) === -1) {
            throw new Error(`Sarale: Invalid sort direction: "${direction}". Allowed only "asc" or "desc".`)
        }

        if (direction === 'desc') {
            column = `-${column}`
        }

        this.sort.push(column)
    }

    where (key, value, group) {
        if (isNull(group)) {
            this.filters[key] = value
        } else {
            if (isUndefined(this.filters[group])) {
                this.filters[group] = {}
            }

            this.filters[group][key] = value
        }
    }

    select (fields) {
        if (!isObject(fields)) {
            throw new Error(`Sarala: Invalid fields list.`)
        }

        forOwn(fields, (value, resource) => {
            this.fields[resource] = value.toString()
        })
    }

    getQuery () {
        this.appendIncludes()
        this.appendFields()
        this.appendFilters()
        this.appendSort()
        this.appendPagination()

        if (this.query.length) {
            this.query = `?${this.query}`
        }

        return this.query
    }

    appendIncludes () {
        if (this.includes.length) {
            this.appendQuery(`include=${this.includes.toString()}`)
        }
    }

    appendFields () {
        let query = ''
        let prepend = ''

        forOwn(this.fields, (fields, resource) => {
            query += `${prepend}fields[${resource}]=${fields.toString()}`
            prepend = '&'
        })

        if (query.length) {
            this.appendQuery(query)
        }
    }

    appendFilters () {
        let query = ''
        let prepend = ''

        forOwn(this.filters, (value, filter) => {
            if (isObject(value)) {
                forOwn(value, (innerValue, innerFilter) => {
                    query += `${prepend}filter[${filter}][${innerFilter}]=${innerValue.toString()}`
                    prepend = '&'
                })
            } else {
                query += (isNull(value)) ? `${prepend}filter[${filter}]` : `${prepend}filter[${filter}]=${value.toString()}`
            }
            prepend = '&'
        })

        if (query.length) {
            this.appendQuery(query)
        }
    }

    appendSort () {
        if (this.sort.length) {
            this.appendQuery(`sort=${this.sort.toString()}`)
        }
    }

    appendPagination () {
        if (!isEmpty(this.pagination)) {
            this.appendQuery(`page[size]=${this.pagination.size}&page[number]=${this.pagination.number}`)
        }
    }

    appendQuery (append) {
        if (this.query.length) {
            append = `&${append}`
        }

        this.query += append
    }
}
