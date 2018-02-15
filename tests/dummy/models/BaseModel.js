import Model from './../../../src/Model';

export default class BaseModel extends Model
{
    baseUrl () {
        return 'https://sarala-demo.app/api';
    }

    async request (config) {
        this.testApiRequest = config;

        return {
            data: this.testApiResponse
        };
    }
}