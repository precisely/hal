import {load} from 'halYAML';
describe('halYAML', function () {
  it('should load JS code', function () {
    const fn = load('!!code function addOne(num) { return num + 1; }');
    expect(fn).toBeFunction();
    expect(fn(2)).toEqual(3);
  });
});