/**
 * @description Reducer for sign in page
 * @author Markus Hilding
 */

import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_UP_STATUS_RESET,
} from './constants.js';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

function signUpReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGN_UP_STATUS_RESET:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      break;
  }

  return state;
}

export default signUpReducer;
