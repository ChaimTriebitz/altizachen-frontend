import { useEffect, useRef } from 'react';

export function useLastVisibleRows(tableData) {
   const tableContainerRef = useRef(null)
   const lastVisibleRows = useRef([])

   useEffect(() => {
      const container = tableContainerRef.current;
      const rows = container.querySelectorAll('tbody tr')
      const observerOptions = {
         root: container,
         rootMargin: '0px',
         threshold: 0.5,
      };

      const observerCallback = (entries) => {
         if (tableData.length < 5) return
         entries.forEach((entry) => {
            const { target, isIntersecting } = entry
            if (isIntersecting) {
               if (!lastVisibleRows.current.includes(target)) {
                  if (lastVisibleRows.current.length === 2) {
                     lastVisibleRows.current.shift().classList.remove('last-visible-row')
                  }
                  lastVisibleRows.current.push(target)
               }
            }
         })
         lastVisibleRows.current.forEach((row) => {
            row.classList.add('last-visible-row')
         })
      }

      const observer = new IntersectionObserver(observerCallback, observerOptions)

      rows.forEach((row) => {
         observer.observe(row);
      })

      return () => {
         observer.disconnect();
      }
   }, [tableData]);

   return tableContainerRef;
};


