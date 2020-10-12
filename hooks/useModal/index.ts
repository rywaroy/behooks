import { useState, useCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';
import { UseAntdTableFormUtils } from '../useAntdTable';

interface IOptions {
  /** form对象 */
  form?: UseAntdTableFormUtils | false;

  /** 默认参数 */
  defaultParams?: any;

  /** 默认form参数 */
  defaultFormData?: any;

  /** form参数格式化 */
  formatParams?: (values: any) => any;

  /** 弹窗确认回调 */
  submitCallback?: (values: any) => void;

  /** 弹窗打开回调 */
  openCallback?: () => void;

  /** 弹窗关闭回调 */
  closeCallback?: () => void;
}

function useModal(service?: (params: any) => Promise<any>, options: IOptions = {}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [key, setKey] = useState<number>(1);

  const {
    form,
    defaultParams = {},
    formatParams,
    defaultFormData,
    submitCallback,
    openCallback,
    closeCallback,
  } = options;

  const toggle = useCallback(() => {
    if (visible) {
      // 关闭
      setVisible(false);
      closeCallback && closeCallback();
    } else {
      // 打开
      setKey(Math.random());
      openCallback && openCallback();
    }
  }, [visible, key]);

  const submit = useCallback(() => {
    let params = { ...defaultParams };
    if (form) {
      form.validateFields(null, (err, values) => {
        if (!err) {
          params = { ...params, ...values };
          handleSubmit(params);
        }
      });
    } else {
      handleSubmit(params);
    }
  }, [toggle, form, service, defaultParams]);

  const handleSubmit = useCallback((params) => {
    if (formatParams) {
      params = formatParams(params);
    }
    if (service) {
      service(params)
        .then((res) => {
          submitCallback && submitCallback(res);
          toggle();
        });
    } else {
      submitCallback && submitCallback(params);
      toggle();
    }
  }, [formatParams, service, submitCallback, toggle]);

  useUpdateEffect(() => {
    setVisible(true);
  }, [key]);

  useUpdateEffect(() => {
    if (visible && form && defaultFormData) {
      form.setFieldsValue(defaultFormData);
    }
  }, [visible]);

  return {
    toggle,
    modalProps: {
      visible,
      key,
      onCancel: toggle,
      onOk: submit,
    },
  };
}

export default useModal;
