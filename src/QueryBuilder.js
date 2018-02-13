import _ from 'lodash'

export default class QueryBuilder {
  constructor () {
    this.includes = []
    this.pagination = {}
  }

  include (resourceName) {
    if (!this.includes[resourceName]) {
      this.includes.push(resourceName)
    }
  }

  paginate (perPage = 10, page = 1) {
    this.pagination = {
      size: perPage,
      number: page
    }
  }

  getQuery () {
    let query = ''

    if (this.includes.length) {
      query = `include=${this.includes.toString()}`
    }

    if (!_.isEmpty(this.pagination)) {
      let pageQuery = `page[size]=${this.pagination.size}&page[number]=${this.pagination.number}`

      if (query.length) {
        pageQuery = `&${pageQuery}`
      }

      query += pageQuery
    }

    if (query.length) {
      query = `?${query}`
    }

    return query
  }
}
