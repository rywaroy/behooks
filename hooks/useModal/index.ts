import { useState, useCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';
import { UseAntdTableFormUtils } from '../useAntdTable';

interface IOptions {
  form?: UseAntdTableFormUtils | false;
  defaultParams?: any;
  formatParams?: (values: any) => any;
  submitCallback?: (values: any) => void;
  openCallback?: () => void;
  closeCallback?: () => void;
}

function useModal(service?: (params: any) => Promise<any>, options: IOptions = {}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [key, setKey] = useState<number>(1);

  const {
    form,
    defaultParams = {},
    formatParams,
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
