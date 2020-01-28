import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  AUTH_WAITING,
  RESET_NEXT,
} from './constants.js';

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
  authWaiting: false,
  next: null,
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
        loading: false,
        error: null,
        authWaiting: false,
        user: action.payload,
      };

    case GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        authWaiting: false,
        error: action.payload,
        user: null,
      };

    case AUTH_WAITING:
      return {
        ...state,
        authWaiting: true,
        next: action.payload,
      };

    case RESET_NEXT:
      return {
        ...state,
        next: null,
      };

    default:
      break;
  }

  return state;
}

export default authReducer;
