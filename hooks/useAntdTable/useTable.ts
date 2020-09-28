import useAntdTable, {
  BaseOptions, OptionsWithFormat, CombineService, PaginatedParams, Result, PaginatedFormatReturn,
} from './index';

function useTable<R = any, Item = any, U extends Item = any>(
    service: CombineService<R, PaginatedParams>,
    options: OptionsWithFormat<R, Item, U>,
  ): Result<Item>;
function useTable<R = any, Item = any, U extends Item = any>(
    service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
    options: BaseOptions<U>,
  ): Result<Item>;
function useTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<any, any>,
  options: BaseOptions<U> | OptionsWithFormat<R, Item, U>,
) {
  const table = useAntdTable(service, {
    formatResult: (res) => ({
      list: res.data,
      total: Number(res.count),
    }),
    ...options,
  });

  table.tableProps.pagination.showTotal = (total) => `共 ${total} 条`;
  table.tableProps.pagination.showSizeChanger = true;
  table.tableProps.pagination.showQuickJumper = true;

  return table;
}

export default useTable;
