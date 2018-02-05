export default class QueryBuilder
{
    constructor() {
        this.includes = [];
    }

    include(resourceName) {
        if (! this.includes[resourceName]) {
            this.includes.push(resourceName);
        }
    }

    getQuery() {
        let query = '';

        if (this.includes.length) {
            query = `includes=${this.includes.toString()}`;
        }

        if (query.length) {
            query = `?${query}`;
        }

        return query;
    }
}