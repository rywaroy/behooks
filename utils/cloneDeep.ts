interface IObject {
  [prop: string]: any;
}

function cloneArray(target: any[]) {
  const cloneTarget: any[] = [];
  for (let i = 0; i < target.length; i++) {
    cloneTarget[i] = cloneDeep(target[i]);
  }
  return cloneTarget;
}

function cloneObject(target: IObject) {
  const cloneTarget: IObject = {};
  Object.keys(target).forEach((key) => {
    cloneTarget[key] = cloneDeep(target[key]);
  });
  return cloneTarget;
}

function cloneDate(target: Date) {
  return new Date(target.getTime());
}

function cloneRegExp(target: RegExp) {
  return new RegExp(target);
}

export default function cloneDeep(target: any) {
  const type = Object.prototype.toString.call(target);
  let cloneTarget: any;

  switch (type) {
    case '[object Object]':
      cloneTarget = cloneObject(target);
      break;
    case '[object Array]':
      cloneTarget = cloneArray(target);
      break;
    case '[object Date]':
      cloneTarget = cloneDate(target);
      break;
    case '[object RegExp]':
      cloneTarget = cloneRegExp(target);
      break;
    default:
      cloneTarget = target;
      break;
  }

  return cloneTarget;
}
