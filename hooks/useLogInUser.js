import axios from 'axios'
import { useCallback } from 'react'
import { useGlobalState } from './useGlobalState'
import { ACTIONS } from '../state'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config/api'

export const useLogInUser = () => {
   const navigate = useNavigate()
   const { dispatch } = useGlobalState()

   const login = useCallback(async (tok) => {
      if (!tok || tok === 'undefined') return false
      localStorage.setItem('authToken', tok)

      try {
         const { data } = await axios.get(API_URL + '/users', {
            headers: { Authorization: 'Bearer ' + tok }
         })
         dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: data.user })
         navigate('/')
         return true
      } catch (error) {
         localStorage.removeItem('authToken')
         dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: null })
         return false
      }
   }, [dispatch, navigate])

   const logout = useCallback(() => {
      localStorage.removeItem('authToken')
      dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: null })
      navigate('/login')
   }, [dispatch, navigate])

   return { login, logout }
}
