/**
 * @description Reducer for applications in page
 * @author Josef Federspiel
 */

import {
  AREA_OF_EXPERTISE_FETCH,
  AREA_OF_EXPERTISE_SUBMIT,
  AVAILABILITY_PERIOD_SUBMIT,
  AREA_OF_EXPERTISE_RECEIVED,
  AREA_OF_EXPERTISE_FETCH_FAILED,
} from './constants.js';

const INITIAL_STATE = {
  loading: false,
  error: null,
  list: [],
  expertise: null,
  availability: null,
};

// eslint-disable-next-line require-jsdoc
function applicationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AREA_OF_EXPERTISE_RECEIVED:
      return {
        ...state,
        loading: false,
        list: action.list,
        error: null,
      };
    case AREA_OF_EXPERTISE_FETCH:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AREA_OF_EXPERTISE_SUBMIT:
      return {
        ...state,
        loading: false,
        error: null,
        expertise: action.expertise,
      };
    case AVAILABILITY_PERIOD_SUBMIT:
      return {
        ...state,
        loading: false,
        error: null,
        availability: action.availability,
      };
    case AREA_OF_EXPERTISE_FETCH_FAILED:
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

export default applicationsReducer;
