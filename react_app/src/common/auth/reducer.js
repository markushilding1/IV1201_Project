import { SET_USER } from './constants.js';

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loading: true,
        error: null,
        user: action.payload,
      };

    default:
      break;
  }

  return state;
}

export default authReducer;
