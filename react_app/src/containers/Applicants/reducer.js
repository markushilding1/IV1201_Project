/**
 * @description Reducer for applicants page
 * @author Philip Romn
 */

import {
  SEARCH_APPLICANTS,
  SUCCESS_APPLICANTS,
  ERROR_APPLICANTS,
  SEARCH_APPLICANT,
  ERROR_APPLICANT,
  SUCCESS_APPLICANT,
} from './constants.js';

const INITIAL_STATE_APPLICANTS = {
  loading: true,
  error: null,
  applicants: [],
};

export function applicantsReducer(state = INITIAL_STATE_APPLICANTS, action) {
  switch (action.type) {
    case SEARCH_APPLICANTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUCCESS_APPLICANTS:
      return {
        ...state,
        loading: false,
        error: null,
        applicants: action.payload,
      };
    case ERROR_APPLICANTS:
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

const INITIAL_STATE_APPLICANT = {
  loading: false,
  error: null,
  applicant: null,
};

export function applicantReducer(state = INITIAL_STATE_APPLICANT, action) {
  switch (action.type) {
    case SEARCH_APPLICANT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUCCESS_APPLICANT:
      return {
        ...state,
        loading: false,
        error: null,
        applicant: action.payload,
      };
    case ERROR_APPLICANT:
      return {
        ...state,
        loading: false,
        error: 'Failed to find applicant',
      };
    default:
      return {
        ...state,
      };
  }
}
