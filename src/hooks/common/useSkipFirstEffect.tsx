import { useRef, useEffect } from 'react';

export const useSkipFirstEffect = (fn: Function, inputs: any[]) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
};
