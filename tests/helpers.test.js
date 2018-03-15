import Unicorn from './dummy/models/Unicorn';

test('can clone a model', () => {
    const rainbowUnicorn = new Unicorn();
    rainbowUnicorn.color = 'Red';

    expect(rainbowUnicorn.color).toEqual('Red');
    rainbowUnicorn.color = 'Orange';

    const darkUnicorn = rainbowUnicorn.clone();
    darkUnicorn.color = 'Black';

    expect(rainbowUnicorn.color).toEqual('Orange');
    expect(darkUnicorn.color).toEqual('Black');
});