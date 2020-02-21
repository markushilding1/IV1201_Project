import {
  SUBMIT_APPLICATION,
  SUBMIT_APPLICATION_FAILED,
  SUBMIT_APPLICATION_SUCCESS,
  DISCARD_APPLICATION,
} from './constants';

/**
 * @author Josef Federspiel
 * @description Submits the application to the database.
 */

export const submitApplication = () => {
  return (dispatch, getState, {getFirebase}) => {
    dispatch({type: SUBMIT_APPLICATION});
    const uid = getState().auth.user.person_id;
    const areaOfExpertise = getState().submission.areaOfExpertise;
    const date = getState().submission.availabilityPeriod;
    const applicationData = {
      areaOfExpertise,
      date,
      uid,
    };
    createApplication(applicationData).then((res) => {
      if (res) {
        console.log("Successes");
        createApplicationSuccess(dispatch);
      } else {
        console.log("Good Failure");
        createApplicationFailure(dispatch, res);
      }
    }).catch((err) => {
      console.err(err);
      createApplicationFailure(dispatch, 'Oops, something went wrong...');
    });
  };
};

/**
 * @author Josef Federspiel
 * @description Discards the application
 */

export const discardApplication = () => {
  return (dispatch) => {
    dispatch({
      type: DISCARD_APPLICATION,
    });
  };
};

/**
 * @author Josef Federspiel
 * @description posts the application to the rest api.
 * @param {object} data Example {
 *    areaOfExpertise: (array[object]),
 *    date: (array[object]),
 *    uid: (string),
 * }
 */

const createApplication = (data) => {
  return new Promise((resolve) => {
    fetch(`http://localhost:5000/iv1201-g7/us-central1/widgets/applications/submit/`, {
      method: 'post',
      // Authorization: accessToken,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

/**
 * @author Josef Federspiel
 * @description Dispatches a successful application submission.
 * @param {function} dispatch Redux dispatch
 */
const createApplicationSuccess = (dispatch) => {
  dispatch({type: SUBMIT_APPLICATION_SUCCESS});
};

/**
 * @author Josef Federspiel
 * @description Dispatches a failed post request and resets
 * the status after 5 seconds.
 * @param {function} dispatch Redux dispatch
 * @param {string} err Error message
 */

const createApplicationFailure = (dispatch, err) => {
  dispatch({
    type: SUBMIT_APPLICATION_FAILED,
    payload: err,
  });
};
