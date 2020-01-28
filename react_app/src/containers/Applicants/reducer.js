/**
 * @description Reducer for applicants page
 * @author Philip Romn
 */

import { SEARCH } from './constants.js';

const INITIAL_STATE = {
  loading: false,
  error: null,
  applicants: [],
};

function applicantsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH:
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
