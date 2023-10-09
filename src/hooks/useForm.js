import { useState } from 'react'
/**
 * 
 * @param {object} entitys 
 * @returns
 */
export const useForm = (entitys) => {
   const [values, setValues] = useState(entitys)
   const handleChange = (e) => setValues((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }))
   const resetValues = () => {
      setValues(Object.keys(values).reduce((acc, key) => {
         acc[key] = ''
         return acc
      }, {}))
   }
   return {
      values,
      handleChange,
      resetValues
   }
}