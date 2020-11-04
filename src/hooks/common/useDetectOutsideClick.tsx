import { useEffect } from 'react';

export const useDetectOutsideClick = (
  ref: React.MutableRefObject<any>,
  cb: Function
) => {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
