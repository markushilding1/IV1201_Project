/**
 * @description Reducer for sign in page
 * @author Markus Hilding
 */

import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_IN_STATUS_RESET,
} from './constants.js';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

function signInReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SIGN_IN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGN_IN_STATUS_RESET:
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

export default signInReducer;
