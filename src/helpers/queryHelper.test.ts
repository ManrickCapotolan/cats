import { parseQuery } from './queryHelper';

describe('parseQuery', () => {
  test('given empty string, it returns empty object', () => {
    expect(parseQuery('')).toEqual({});
  });
  test('given invalid query string, returns empty object', () => {
    expect(parseQuery('/breeds')).toEqual({});
  });
  test('given one valid query string, returns key value pair', () => {
    expect(parseQuery('/?breeds=cat')).toEqual({ breeds: 'cat' });
  });
  test('given two valid query strings, returns key value pair', () => {
    expect(parseQuery('/?breeds=cat&food=fish')).toEqual({ breeds: 'cat', food: 'fish' });
  });
  test('given query string whose value has _, returns correct value', () => {
    expect(parseQuery('/?breeds=cat_2')).toEqual({ breeds: 'cat_2' });
  });
  test('given two duplicate keys, it returns 2nd value', () => {
    expect(parseQuery('/?breeds=cat&breeds=cat_2')).toEqual({ breeds: 'cat_2' });
  });
});
