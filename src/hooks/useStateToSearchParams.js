import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { useUpdateEffect } from './useUpdateEffect';

export const useStateToSearchParams = (key, state, setState, debounce = 0) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const value = searchParams.get(key)
   useDebounce(() => {
      searchParams.set(key, state)
      setSearchParams(searchParams)
   }, debounce, [state])

   useUpdateEffect(() => setState(value), [searchParams])
}
