import axios from 'axios';
import { useGlobalState } from './useGlobalState';
import { ACTIONS } from '../state';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useLogInUser = (tok) => {
   const navigate = useNavigate()

   const { dispatch, loggedInUser } = useGlobalState()

   useEffect(() => {
      if (loggedInUser) navigate('/')
   }, [])

   const login = async (tok) => {
      localStorage.setItem('authToken', tok)
      try {
         // if()
         const { data } = await axios.get(`http://localhost:5000/api/users`, {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${tok}`
            }
         })
         dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: data.user })
         navigate('/')
      } catch (error) {
         console.log(error);
      }
   }

   const logout = async () => {
      localStorage.removeItem('authToken')
      dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: null })
      navigate('/login')
   }

   return {
      login,
      logout
   }


}