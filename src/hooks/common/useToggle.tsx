import { useState, useCallback } from 'react';

export const useToggle = (defaultValue: boolean = false) => {
  const [isActive, setToggle] = useState(defaultValue);

  const toggle = useCallback(() => {
    setToggle((prevState) => !prevState);
  }, [setToggle]);

  const setActive = useCallback(() => {
    setToggle(true);
  }, [setToggle]);

  const setInActive = useCallback(() => {
    setToggle(false);
  }, [setToggle]);

  return { isActive, toggle, setActive, setInActive };
};
