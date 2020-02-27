/**
 * @description Reducer for submission
 * @author Josef Federspiel
 */

import {
  SUBMIT_APPLICATION,
  SUBMIT_APPLICATION_FAILED,
  SUBMIT_APPLICATION_SUCCESS,
  DISCARD_APPLICATION,
  SUBMIT_EXPERTISE,
  SUBMIT_AVAILABILITY_PERIOD,
} from './constants';

const INITIAL_STATE = {
  loading: false,
  error: null,
  areaOfExpertise: [],
  availabilityPeriod: [],
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
        submissionSuccess: true,
      };
    case SUBMIT_APPLICATION_FAILED:
      debugger;
      return {
        ...state,
        loading: false,
        error: action.payload,
        submissionSuccess: false,
      };
    case DISCARD_APPLICATION:
      return {
        ...state,
        loading: false,
        error: null,
        areaOfExpertise: [],
        availabilityPeriod: [],
        submissionSuccess: false,
      };
    case SUBMIT_EXPERTISE:
      return {
        ...state,
        loading: false,
        error: null,
        areaOfExpertise: action.expertise,
      };
    case SUBMIT_AVAILABILITY_PERIOD:
      return {
        ...state,
        loading: false,
        error: null,
        availabilityPeriod: action.availability,
      };
    default:
      break;
  }

  return state;
}

export default submissionReducer;
