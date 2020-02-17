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
        areaOfExpertise: [],
        availabilityPeriod: [],
        areaOfExpertiseId: [],
      };
    case SUBMIT_EXPERTISE:
      debugger;
      return {
        ...state,
        loading: false,
        error: null,
        areaOfExpertise: state.areaOfExpertise.concat(action.expertise),
      };
    case SUBMIT_AVAILABILITY_PERIOD:
      return {
        ...state,
        loading: false,
        error: null,
        availabilityPeriod: state.availabilityPeriod.concat(action.availability),
      };
    default:
      break;
  }

  return state;
}

export default submissionReducer;
