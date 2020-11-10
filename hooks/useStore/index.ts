import { useEffect, useState } from 'react';

interface IConfig {
  namespace: string;
  state: any;
}

type SetStateFunction = React.Dispatch<React.SetStateAction<number>>;

interface IQueue {
  [namespace: string]: Set<SetStateFunction>;
}

const stores: any = {};

const queue: IQueue = {};

/**
 * 订阅 收集需要更新的组件的setState方法
 */
const subscribe = (name: string, cb: SetStateFunction) => {
  if (!queue[name]) queue[name] = new Set<SetStateFunction>();
  queue[name].add(cb);
};

/**
 * 取消订阅
 */
const unSubscribe = (name: string, cb: SetStateFunction) => {
  if (!queue[name]) return;
  queue[name].delete(cb);
};

/**
 * 广播 执行收集的setState方法，触发组件更新
 */
const broadcast = (name: string, state: number) => {
  if (!queue[name]) return;
  queue[name].forEach((fn) => fn(state));
};

/**
 * 创建Store
 */
export function createStore(config: IConfig) {
  const { namespace, state } = config;

  if (!namespace) {
    return;
  }

  if (stores[namespace]) {
    return stores[namespace];
  }

  stores[namespace] = state;

  return state;
}

/**
 * 创建Store 返回store数据
 */
export function useStore(config: string | IConfig) {
  let namespace: string;
  if (typeof config === 'object') {
    namespace = config.namespace;
    createStore(config);
  } else {
    namespace = config;
  }

  if (!namespace || !stores[namespace]) {
    return [];
  }

  const [, setState] = useState<number>();

  useEffect(() => {
    subscribe(namespace, setState);
    return () => unSubscribe(namespace, setState);
  }, []);

  function setStore(object: any) {
    stores[namespace] = { ...stores[namespace], ...object };
    broadcast(namespace, Math.random());
  }

  return [
    stores[namespace],
    setStore,
  ];
}
