import { DependencyList } from 'react';

type RequestService = string | {
    [key: string]: any;
};

export declare type Service<R, P extends any[]> = (...args: P) => Promise<R>;

export type CombineService<R, P extends any[]> = RequestService | ((...args: P) => RequestService) | Service<R, P>;

type CachedKeyType = string | number;

type BaseOptions<R, P extends any[]> = {
    refreshDeps?: DependencyList;
    manual?: boolean;
    onSuccess?: (data: R, params: P) => void;
    onError?: (e: Error, params: P) => void;
    defaultLoading?: boolean;
    loadingDelay?: number;
    defaultParams?: P;
    pollingInterval?: number;
    pollingWhenHidden?: boolean;
    fetchKey?: (...args: P) => string;
    paginated?: false;
    loadMore?: false;
    refreshOnWindowFocus?: boolean;
    focusTimespan?: number;
    cacheKey?: CachedKeyType;
    cacheTime?: number;
    staleTime?: number;
    debounceInterval?: number;
    throttleInterval?: number;
    initialData?: R;
    requestMethod?: (service: any) => Promise<any>;
    ready?: boolean;
    throwOnError?: boolean;
};

export interface PaginatedFormatReturn<Item> {
    total: number;
    list: Item[];
    [key: string]: any;
}

export declare type PaginatedParams = [{
    current: number;
    pageSize: number;
    sorter?: any;
    filters?: any;
}, ...any[]];

export interface BasePaginatedOptions<U> extends Omit<BaseOptions<PaginatedFormatReturn<U>, PaginatedParams>, 'paginated'> {
    paginated: true;
    defaultPageSize?: number;
}

export interface PaginatedOptionsWithFormat<R, Item, U> extends Omit<BaseOptions<PaginatedFormatReturn<U>, PaginatedParams>, 'paginated'> {
    paginated: true;
    defaultPageSize?: number;
    formatResult: (data: R) => PaginatedFormatReturn<Item>;
}

export interface PaginatedResult<Item> extends BaseResult<PaginatedFormatReturn<Item>, PaginatedParams> {
    pagination: {
        current: number;
        pageSize: number;
        total: number;
        totalPage: number;
        onChange: (current: number, pageSize: number) => void;
        changeCurrent: (current: number) => void;
        changePageSize: (pageSize: number) => void;
        [key: string]: any;
    };
    tableProps: {
        dataSource: Item[];
        loading: boolean;
        onChange: (pagination: PaginationConfig, filters?: any, sorter?: any) => void;
        pagination: PaginationConfig;
        [key: string]: any;
    };
    sorter?: any;
    filters?: any;
}

export interface BaseResult<R, P extends any[]> extends FetchResult<R, P> {
    reset: () => void;
    fetches: {
        [key in string]: FetchResult<R, P>;
    };
}

export interface FetchResult<R, P extends any[]> {
    loading: boolean;
    data: R | undefined;
    error: Error | undefined;
    params: P;
    cancel: noop;
    refresh: () => Promise<R>;
    mutate: Mutate<R>;
    run: (...args: P) => Promise<R>;
    unmount: () => void;
}

type noop = (...args: any[]) => void;
type Mutate<R> = (x: R | undefined | ((data: R) => R)) => void;

export interface PaginationConfig {
    total?: number;
    defaultCurrent?: number;
    disabled?: boolean;
    current?: number;
    defaultPageSize?: number;
    pageSize?: number;
    onChange?: (page: number, pageSize?: number) => void;
    hideOnSinglePage?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[];
    onShowSizeChange?: (current: number, size: number) => void;
    showQuickJumper?: boolean | {
        goButton?: React.ReactNode;
    };
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    simple?: boolean;
    style?: React.CSSProperties;
    locale?: Object;
    className?: string;
    prefixCls?: string;
    selectPrefixCls?: string;
    itemRender?: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', originalElement: React.ReactElement<HTMLElement>) => React.ReactNode;
    role?: string;
    showLessItems?: boolean;
    [key: string]: any;
}
