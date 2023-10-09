import { ACTIONS } from './actions';

export const reducer = (state, action) => {
   switch (action.type) {
      // payload => string
      case ACTIONS.SET:
         return { ...state, [action.entity]: action.payload, }
      default:
         return state
   }
};

