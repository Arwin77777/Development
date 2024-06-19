// authReducer.js
import { STORE_TOKEN, REMOVE_TOKEN } from './actions';

const initialState = {
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;
