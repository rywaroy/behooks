import { useState, useCallback } from 'react';
import { UseAntdTableFormUtils } from '../useAntdTable';

interface IOptions {
    form?: UseAntdTableFormUtils | false;
    defaultParams?: any;
}

function useModal(service?: (params: any) => Promise<any>, options: IOptions = {}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [key, setKey] = useState<number>(1);

  const { form, defaultParams = {} } = options;

  const toggle = useCallback(() => {
    setVisible(!visible);
    if (visible) {
      setTimeout(() => {
        setKey(Math.random());
      }, 500);
    }
  }, [visible, key]);

  const submit = useCallback(() => {
    if (service) {
      let params = { ...defaultParams };
      if (form) {
        form.validateFields(null, (values) => {
          params = { ...params, ...values };
          service(params).then(() => toggle());
        });
      } else {
        service(params).then(() => toggle());
      }
    } else {
      toggle();
    }
  }, [toggle, form, service, defaultParams]);

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
