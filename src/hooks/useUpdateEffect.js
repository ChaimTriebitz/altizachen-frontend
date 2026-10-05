import { useEffect, useRef } from "react"

/**
 * 
 * @param {Function} callback 
 * @param {Array} dependencies 
 */

export function useUpdateEffect(callback, dependencies) {
   const firstRenderRef = useRef(true)

   // eslint-disable-next-line react-hooks/exhaustive-deps
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => {
      if (firstRenderRef.current) {
         firstRenderRef.current = false
         return
      }
      return callback()
   }, dependencies)
}