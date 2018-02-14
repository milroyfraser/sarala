import Fool from "./dummy/models/Fool";
import Unicorn from "./dummy/models/Unicorn";

const initModelLikeAFool = () => {
    new Fool();
};

test('it throws error when try to initialize model without resource name', () => {
    expect(initModelLikeAFool).toThrow('Sarale: Resource name not defined in Fool model. Implement resourceName method in the Fool model to resolve this error.');
});

test('can call overridable methods of initialize model', () => {
    const unicorn = new Unicorn();

    expect(unicorn.fields()).toEqual([]);
    expect(unicorn.dates()).toEqual([]);
    expect(unicorn.relationships()).toEqual({});
    expect(unicorn.computed()).toEqual({});
    expect(unicorn.resourceName()).toEqual('unicorns');
    expect(unicorn.baseUrl()).toEqual('https://sarala-demo.app/api');
    expect(unicorn.dateFormat()).toEqual('YYYY-MM-DD HH:mm');
});