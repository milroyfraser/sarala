export default class UrlBuilder
{
    constructor(baseUrl, resourceName) {
        this.baseUrl = baseUrl;
        this.resourceName = resourceName;
    }

    getUrl() {
        return `${this.baseUrl}/${this.resourceName}`;
    }
}