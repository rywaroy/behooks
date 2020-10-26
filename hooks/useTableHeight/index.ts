import { useMemo } from 'react';

export default function useTableHeight(height = 420) {
  return useMemo(() => document.body.clientHeight - height, []);
}
