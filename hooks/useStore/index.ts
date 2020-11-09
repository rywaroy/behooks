import { useEffect, useState } from 'react';

interface IConfig {
  namespace: string;
  state: any;
}

const stores: any = {};

const queue: any = {};

const subScribe = (name: string, cb: Function) => {
  if (!queue[name]) queue[name] = [];
  queue[name].push(cb);
};

const unSubScribe = (name: string, cb: Function) => {
  if (!queue[name]) return;
  const index = queue[name].indexOf(cb);
  if (index !== -1) queue[name].splice(index, 1);
};

const broadcast = (name: string, state: any) => {
  if (!queue[name]) return;
  queue[name].forEach((fn: Function) => fn(state));
};

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
    subScribe(namespace, setState);
    return () => unSubScribe(namespace, setState);
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
