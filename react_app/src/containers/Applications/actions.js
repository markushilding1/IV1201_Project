import {AREA_OF_EXPERTISE_FETCH, AREA_OF_EXPERTISE_RECEIVED, AREA_OF_EXPERTISE_SUBMIT} from './constants';
import {SUBMIT_APPLICATION} from './Submission/constants';
/**
 * @author Josef Federspiel
 * @description Gets the different areas of expertise listed in the database.
 */

export const getAreaOfExpertise = () => {
  return (dispatch) => {
    dispatch({type: AREA_OF_EXPERTISE_FETCH});
    areaOfExpertise().then((res) => areaOfExpertiseReceived(dispatch, res));
  };
};

export const submitForm = (data) => {
  return (dispatch) => {
    dispatch(
        {
          type: AREA_OF_EXPERTISE_SUBMIT,
          application: data,
        });
  };
};

const areaOfExpertiseReceived = (dispatch, payload) => {
  dispatch({
    type: AREA_OF_EXPERTISE_RECEIVED,
    list: payload,
  });
};

const areaOfExpertise = () => {
  return new Promise((resolve) => {
    fetch(`http://localhost:5000/iv1201-g7/us-central1/widgets/applications/expertise/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok || (res.ok && res.status !== 200)) {
            resolve(false);
          }
          return res.json();
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          resolve(false);
        });
  });
};
