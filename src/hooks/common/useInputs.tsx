import React, { useState } from 'react';

export const useInputs = <T extends object>() => {
  const [inputs, setInputs] = useState<T>({} as T);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  return {
    handleInputChange,
    inputs,
  };
};
