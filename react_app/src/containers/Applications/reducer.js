/**
 * @description Reducer for applications in page
 * @author Josef Federspiel
 */

import {
  AREA_OF_EXPERTISE,
  YEARS_OF_EXPERIENCE,
} from './constants.js';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

function applicationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AREA_OF_EXPERTISE:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case YEARS_OF_EXPERIENCE:
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
