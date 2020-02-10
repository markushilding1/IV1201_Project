/**
 * @description Reducer for applications in page
 * @author Josef Federspiel
 */

import {
  AREA_OF_EXPERTISE_FETCH,
  AREA_OF_EXPERTISE_SUBMIT,
  YEARS_OF_EXPERIENCE_SUBMIT,
  AREA_OF_EXPERTISE_RECEIVED,
} from './constants.js';


const INITIAL_STATE = {
  loading: false,
  error: null,
  list: [],
};

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
        application: action.application,
        getfucked: 'hello',
      };
    case YEARS_OF_EXPERIENCE_SUBMIT:
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

export default applicationsReducer;
