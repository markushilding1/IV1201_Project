/**
 * @description Reducer for submission
 * @author Josef Federspiel
 */

import {
  SUBMIT_APPLICATION,
  SUBMIT_APPLICATION_FAILED,
  SUBMIT_APPLICATION_SUCCESS,
  DISCARD_APPLICATION,
} from './constants';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

function submissionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_APPLICATION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUBMIT_APPLICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SUBMIT_APPLICATION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DISCARD_APPLICATION:
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
