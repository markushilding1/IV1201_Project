/**
 * @description Reducer for applicants page
 * @author Philip Romn
 */

import { SEARCH, SUCCESS, ERROR } from './constants.js';

const INITIAL_STATE = {
  loading: true,
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
    case SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        applicants: action.payload,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: 'Failed to find applicants',
      };
    default:
      return {
        ...state,
      };
  }
}

export default applicantsReducer;
