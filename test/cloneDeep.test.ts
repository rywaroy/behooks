import cloneDeep from '../utils/cloneDeep';

describe('cloneDeep 库测试', () => {
  it('cloneDeep 方法', () => {
    const obj = {
      a: 1, b: [1, 2, 3], c: { a: 'a', b: 'b' }, d: 'd',
    };
    const cloneObj = cloneDeep(obj);
    expect(cloneObj).not.toBe(obj);
    expect(cloneObj).toEqual(obj);
  });

  it('cloneDeep Object', () => {
    const obj = { a: 1 };
    const cloneObj = cloneDeep(obj);
    cloneObj.a = 2;
    expect(cloneObj.a).not.toBe(obj.a);
  });

  it('cloneDeep Array', () => {
    const obj = { a: [1, 2, 3] };
    const cloneObj = cloneDeep(obj);
    cloneObj.a[0] = 5;
    expect(cloneObj.a[0]).not.toBe(obj.a[0]);
  });

  it('cloneDeep Date', () => {
    const time = new Date();
    const obj = { a: time };
    const cloneObj = cloneDeep(obj);
    cloneObj.a = new Date(time.getTime() + 10000);
    expect(cloneObj.a).not.toBe(obj.a);
  });

  it('cloneDeep RegExp', () => {
    const obj = { a: /abc/ };
    const cloneObj = cloneDeep(obj);
    cloneObj.a = /bcd/;
    expect(cloneObj.a).not.toBe(obj.a);
  });
});
