import { useState, useCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';

interface UseAntdTableFormUtils {
  validateFields: (callback: (errors: any, values: any) => void) => void;
  [key: string]: any;
}

interface IOptions {
  /** form对象 */
  form?: UseAntdTableFormUtils | false;

  /** 默认form参数 */
  defaultFormData?: any;
}

function useModal(options: IOptions = {}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [key, setKey] = useState<number>(1);

  const {
    form,
    defaultFormData,
  } = options;

  /**
   * 弹窗打开/关闭
   */
  const toggle = useCallback(() => {
    if (visible) {
      // 关闭
      setVisible(false);
    } else {
      // 打开
      setKey(Math.random());
    }
  }, [visible, key]);

  /**
   * 监听key变化，打开弹窗
   */
  useUpdateEffect(() => {
    setVisible(true);
  }, [key]);

  /**
   * 打开弹窗设置默认表单数据
   */
  useUpdateEffect(() => {
    if (visible && form && defaultFormData) {
      form.setFieldsValue(defaultFormData);
    }
  }, [visible, form, defaultFormData]);

  return {
    toggle,
    modalProps: {
      visible,
      key,
      onCancel: toggle,
    },
  };
}

export default useModal;
