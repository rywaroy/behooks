import { useEffect, useReducer } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { subscribe, unSubscribe, notify } from '../../utils/subscribe';

interface IConfig {
  namespace: string;
  state: any;
}

const stores: any = {};

const defaultStores: any = {};

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

  if (typeof state === 'function') {
    stores[namespace] = state();
    defaultStores[namespace] = state;
  } else {
    stores[namespace] = state;
    defaultStores[namespace] = cloneDeep(state);
  }

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

  if (!namespace || !stores[namespace]) return [];

  const [state, setState] = useReducer((state: any, action: any) => ({ ...state, ...action }), stores[namespace]);

  useEffect(() => {
    subscribe(namespace, setState);
    return () => unSubscribe(namespace, setState);
  }, []);

  function setStore(object: any) {
    stores[namespace] = { ...stores[namespace], ...object };
    notify(namespace, stores[namespace]);
  }

  return [
    state,
    setStore,
  ];
}

/**
 * 清空store
 */
export function clearStore(namespace: string) {
  if (!namespace || !stores[namespace]) return;
  const state = defaultStores[namespace];
  if (typeof state === 'function') {
    stores[namespace] = state();
  } else {
    stores[namespace] = cloneDeep(defaultStores[namespace]);
  }
  notify(namespace, stores[namespace]);
}
