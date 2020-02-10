import { SUCCESS, ERROR, SEARCH } from './constants';

export const fetchApplicants = () => {
  return (dispatch) => {
    console.log('ff');

    dispatch({ type: SEARCH });

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

const searchSuccess = (dispatch, applicants) => {
  console.log('ss');
  dispatch({
    type: SUCCESS,
    payload: applicants,
  });
};

const searchFail = (dispatch, err) => {
  console.log('sf');
  dispatch({
    type: ERROR,
    payload: err,
  });
};
