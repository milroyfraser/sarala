import _ from 'lodash';

export default class QueryBuilder {
    constructor () {
        this.reset();
    }

    reset () {
        this.query = '';
        this.includes = [];
        this.sort = [];
        this.filters = {};
        this.fields = {};
        this.pagination = {};
    }

    include (resourceName) {
        if (!this.includes[resourceName]) {
            this.includes.push(resourceName);
        }
    }

    paginate (perPage, page) {
        this.pagination = {
            size: perPage,
            number: page
        };
    }

    orderBy (column, direction) {
        if (_.indexOf(['asc', 'desc'], direction) === -1) {
            throw new Error(`Sarale: Invalid sort direction: "${direction}". Allowed only "asc" or "desc".`);
        }

        if (direction === 'desc') {
            column = `-${column}`;
        }

        this.sort.push(column);
    }

    where (key, value, group) {
        if (_.isNull(group)) {
            this.filters[key] = value;
        } else {
            if (_.isUndefined(this.filters[group])) {
                this.filters[group] = {};
            }

            this.filters[group][key] = value;
        }
    }

    select (fields) {
        if (!_.isObject(fields)) {
            throw new Error(`Sarala: Invalid fields list.`);
        }

        _.forOwn(fields, (value, resource) => {
            this.fields[resource] = value.toString();
        });
    }

    getQuery () {
        this.appendIncludes();
        this.appendFields();
        this.appendFilters();
        this.appendSort();
        this.appendPagination();

        if (this.query.length) {
            this.query = `?${this.query}`;
        }

        return this.query;
    }

    appendIncludes () {
        if (this.includes.length) {
            this.appendQuery(`include=${this.includes.toString()}`);
        }
    }

    appendFields () {
        let query = '';
        let prepend = '';

        _.forOwn(this.fields, (fields, resource) => {
            query += `${prepend}fields[${resource}]=${fields.toString()}`;
            prepend = '&';
        });

        if (query.length) {
            this.appendQuery(query);
        }
    }

    appendFilters () {
        let query = '';
        let prepend = '';

        _.forOwn(this.filters, (value, filter) => {
            if (_.isObject(value)) {
                _.forOwn(value, (innerValue, innerFilter) => {
                    query += `${prepend}filter[${filter}][${innerFilter}]=${innerValue.toString()}`;
                    prepend = '&';
                });
            } else {
                query += (_.isNull(value)) ? `${prepend}filter[${filter}]` : `${prepend}filter[${filter}]=${value.toString()}`;
            }
            prepend = '&';
        });

        if (query.length) {
            this.appendQuery(query);
        }
    }

    appendSort () {
        if (this.sort.length) {
            this.appendQuery(`sort=${this.sort.toString()}`);
        }
    }

    appendPagination () {
        if (!_.isEmpty(this.pagination)) {
            this.appendQuery(`page[size]=${this.pagination.size}&page[number]=${this.pagination.number}`);
        }
    }

    appendQuery (append) {
        if (this.query.length) {
            append = `&${append}`;
        }

        this.query += append;
    }
}
