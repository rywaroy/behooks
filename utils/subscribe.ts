type SetStateFunction = React.Dispatch<React.SetStateAction<any>>;

interface IQueue {
  [namespace: string]: Set<SetStateFunction>;
}

const queue: IQueue = {};

/**
 * 订阅 收集需要更新的组件的setState方法
 */
export const subscribe = (name: string, cb: SetStateFunction) => {
  if (!queue[name]) queue[name] = new Set<SetStateFunction>();
  queue[name].add(cb);
};

/**
 * 取消订阅
 */
export const unSubscribe = (name: string, cb: SetStateFunction) => {
  if (!queue[name]) return;
  queue[name].delete(cb);
};

/**
 * 通知订阅 执行收集的setState方法，触发组件更新
 */
export const notify = (name: string, state: any) => {
  if (!queue[name]) return;
  queue[name].forEach((fn) => fn(state));
};
