import { SUCCESS, ERROR, SEARCH } from './constants';

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
  return (dispatch) => {
    dispatch({ type: SEARCH });

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); //we only get here if there is no error
      })
      .then((data) => {
        searchSuccess(dispatch, data);
      })
      .catch((err) => {
        searchFail(dispatch, 'Failed to query applicants');
      });
  };
};

/**
 * @author Philip Romin
 * @description Dispatches a successful search
 * @param {function} dispatch Redux dispatch
 * @param {} applicants Found applicants
 */
const searchSuccess = (dispatch, applicants) => {
  dispatch({
    type: SUCCESS,
    payload: applicants,
  });
};

/**
 * @author Philip Romin
 * @description Dispatches a failed search
 * @param {function} dispatch Redux dispatch
 * @param {string} err Error message
 */
const searchFail = (dispatch, err) => {
  dispatch({
    type: ERROR,
    payload: err,
  });
};
