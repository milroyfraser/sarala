import Model from './../../../src/Model';

export default class BaseModel extends Model
{
    baseUrl () {
        return 'https://sarala-demo.app/api';
    }

    request (config) {
        // make the request to the api here
    }
}