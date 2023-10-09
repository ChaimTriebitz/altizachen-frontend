import { useEffect, useRef } from 'react';
const elementsToIgnore = ['li']
export function useBlur(callback) {
   const ref = useRef(null);
   const handleBlur = (e) => {
      if (elementsToIgnore.includes(e.target.localName)) return
      if (e.target.localName === 'dialog' && ref.current) callback()
      if (ref.current && !ref.current.contains(e.target) && !e.target.dataset.blur) {
         callback();
      }
   };
   useEffect(() => {
      document.addEventListener('mousedown', handleBlur);
      return () => {
         document.removeEventListener('mousedown', handleBlur);
      };
   }, []);

   return ref;
};