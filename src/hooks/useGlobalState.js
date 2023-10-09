import { useContext } from 'react'
import { Context } from '../state'

/**
 * @returns {object} { 
 *       dispatch 
 * }
 */

export const useGlobalState = () => {
   const context = useContext(Context)
   return context
}

