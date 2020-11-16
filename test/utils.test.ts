import cloneDeep from '../utils/cloneDeep';

describe('utils 库测试', () => {
  it('cloneDeep 方法', () => {
    const obj = {
      a: 1, b: [1, 2, 3], c: { a: 'a', b: 'b' }, d: 'd',
    };
    const cloneObj = cloneDeep(obj);
    expect(cloneObj).not.toBe(obj);
    expect(cloneObj).toEqual(obj);
  });
});
