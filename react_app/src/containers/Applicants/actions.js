import {
  SUCCESS_APPLICANTS,
  ERROR_APPLICANTS,
  SEARCH_APPLICANTS,
  SUCCESS_APPLICANT,
  ERROR_APPLICANT,
  SEARCH_APPLICANT,
} from './constants';

/**
 * @author Philip Romin
 * @description Fetch a list of applicants
 */
export const fetchApplicants = (data) => {
  const url = new URL(
    'http://localhost:5000/iv1201-g7/us-central1/widgets/applications',
  );
  url.search = new URLSearchParams(data);
  console.log(url.toString());

  console.log(data);
  return (dispatch, getState, { getFirebase }) => {
    const accessToken = getState().firebase.auth.stsTokenManager.accessToken;
    dispatch({ type: SEARCH_APPLICANTS });

    fetch(url, {
      headers: {
        authorization: accessToken,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); //we only get here if there is no error
      })
      .then((data) => {
        searchSuccess(dispatch, SUCCESS_APPLICANTS, data);
      })
      .catch((err) => {
        searchFail(dispatch, ERROR_APPLICANTS, 'Failed to query applicants');
      });
  };
};

/**
 * @author Philip Romin
 * @description Fetch a list of applicants
 */
export const fetchApplicant = (id) => {
  return (dispatch, getState, { getFirebase }) => {
    const accessToken = getState().firebase.auth.stsTokenManager.accessToken;
    dispatch({ type: SEARCH_APPLICANT });

    fetch(
      `http://localhost:5000/iv1201-g7/us-central1/widgets/applications/${id}`,
      {
        headers: {
          authorization: accessToken,
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); //we only get here if there is no error
      })
      .then((data) => {
        searchSuccess(dispatch, SUCCESS_APPLICANT, data[0]);
      })
      .catch((err) => {
        searchFail(dispatch, ERROR_APPLICANT, 'Failed to query applicants');
      });
  };
};

/**
 * @author Philip Romin
 * @description Dispatches a successful search
 * @param {function} dispatch Redux dispatch
 * @param {} applicants Found applicants
 */
const searchSuccess = (dispatch, type, data) => {
  dispatch({
    type: type,
    payload: data,
  });
};

/**
 * @author Philip Romin
 * @description Dispatches a failed search
 * @param {function} dispatch Redux dispatch
 * @param {string} err Error message
 */
const searchFail = (dispatch, type, err) => {
  dispatch({
    type: type,
    payload: err,
  });
};
