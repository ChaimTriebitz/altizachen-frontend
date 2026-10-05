import { useEffect, useRef } from "react"

/**
 * 
 * @param {Function} callback 
 * @param {Array} dependencies 
 */

export function useUpdateEffect(callback, dependencies) {
   const firstRenderRef = useRef(true)

   useEffect(() => {
      if (firstRenderRef.current) {
         firstRenderRef.current = false
         return
      }
      return callback()
   // dependencies is intentionally supplied by the caller, so React's exhaustive-deps rule cannot statically analyze it.
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, dependencies)
}