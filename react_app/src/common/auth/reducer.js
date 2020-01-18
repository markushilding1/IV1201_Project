import { GET_USER, GET_USER_SUCCESS, GET_USER_FAILED } from './constants.js';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      break;
  }

  return state;
}

export default authReducer;
