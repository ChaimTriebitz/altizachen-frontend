import { useCallback, useEffect, useRef } from 'react';
export function useBlur(callback) {
   const ref = useRef(null);
   const handleBlur = useCallback((e) => {
      if (ref.current && !ref.current.contains(e.target)) {
         callback();
      }
   }, [callback]);
   useEffect(() => {
      document.addEventListener('mousedown', handleBlur);
      return () => {
         document.removeEventListener('mousedown', handleBlur);
      };
   }, [handleBlur]);

   return ref;
};