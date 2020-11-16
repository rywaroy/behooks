export default function cloneDeep(target: any) {
  if (target && typeof target === 'object') {
    const isArray = Array.isArray(target);
    const cloneTarget = isArray ? [] : {};

    const keys = isArray ? target : Object.keys(target);

    for (let i = 0; i < keys.length; i++) {
      if (isArray) {
        cloneTarget[i] = cloneDeep(target[i]);
      } else {
        cloneTarget[keys[i]] = cloneDeep(target[keys[i]]);
      }
    }

    return cloneTarget;
  }
  return target;
}
