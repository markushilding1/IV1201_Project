import {SUCCESS, ERROR, SEARCH} from './constants';

/**
 * @author Philip Romin
 * @description Fetch a list of applicants
 */
export const fetchApplicants = () => {
  return (dispatch) => {
    console.log('ff');

    dispatch({type: SEARCH});

    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          searchSuccess(dispatch, data);
        })
        .catch((err) => {
          console.log('err');
          searchFail(dispatch, err);
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
  console.log('ss');
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
  console.log('sf');
  dispatch({
    type: ERROR,
    payload: err,
  });
};
