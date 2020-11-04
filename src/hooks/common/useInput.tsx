import { useState, useCallback } from 'react';

export const useInput = (
  defaultValue: string | number = '',
  cb?: () => void
) => {
  const [value, setInputValue] = useState(defaultValue + '');
  const onChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | string
        | number
        | undefined
        | null
    ) => {
      let value = undefined;
      if (typeof e === 'number' || typeof e === 'string') {
        value = e + '';
      } else if (typeof e === 'undefined' || e === null) {
        value = '';
      } else {
        value = e.target.value;
      }
      if (cb) cb();
      setInputValue(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return { value, onChange, setInputValue };
};
