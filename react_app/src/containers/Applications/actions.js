import {
  AREA_OF_EXPERTISE_FETCH,
  AREA_OF_EXPERTISE_FETCH_FAILED,
  AREA_OF_EXPERTISE_RECEIVED,
  AREA_OF_EXPERTISE_SUBMIT,
  AVAILABILITY_PERIOD_SUBMIT,
} from './constants';
/**
 * @author Josef Federspiel
 * @description Gets the different areas of expertise listed in the database.
 */

const API_URL = process.env.REACT_APP_API_URL;

export const getAreaOfExpertise = () => {
  return (dispatch, getState, {getFirebase}) => {
    dispatch({type: AREA_OF_EXPERTISE_FETCH});
    const accessToken = getState().firebase.auth.stsTokenManager.accessToken;
    areaOfExpertise(accessToken).then((res) => {
      if (res) {
        areaOfExpertiseReceived(dispatch, res);
      } else {
        areaOfExpertiseFetchFailed(dispatch, res);
      }
    });
  };
};

/**
 * @author Josef Federspiel
 * @description Dispatches an area of expertise and passes the
 * users data to the application assuming that
 * the data does not already exist in the application
 * Then the data is update appropriately .
 *  @param {object} data Example {
 *    areaOfExpertise:(string),
 *    yearsOfExperience: (int),
 *    areaOfExpertiseId: (int),
 * }
 *
 */

export const submitAreaOfExpertise = (data) => {
  return (dispatch, getState) => {
    const duplicateCheck = [...getState().submission.areaOfExpertise];
    if (data.areaOfExpertiseId !== null && data.yearsOfExperience !== null) {
      let dupe = false;
      for (let i = 0; i < duplicateCheck.length; i++) {
        if (duplicateCheck[i].areaOfExpertiseId === data.areaOfExpertiseId) {
          duplicateCheck[i] = data;
          dupe = true;
        }
      }
      if (!dupe) {
        duplicateCheck.push(data);
      }
      dispatch({
        type: AREA_OF_EXPERTISE_SUBMIT,
        expertise: duplicateCheck,
      });
    }
  };
};

/**
 @author Josef Federspiel
 * @description Dispatches availability period and passes the
 * users data to the application.
 *  @param {object} data Example {
 *    fromDate:(date),
 *    toDate: (date),
 * }
 **/

export const submitAvailabilityPeriod = (data) => {
  return (dispatch, getState) => {
    if (data !== null) {
      const duplicateCheck = [...getState().submission.availabilityPeriod];
      let dupe = false;
      for (let i = 0; i < duplicateCheck.length; i++) {
        if (duplicateCheck[i].fromDate === data.fromDate) {
          duplicateCheck[i] = data;
          dupe = true;
        }
      }
      if (!dupe) {
        duplicateCheck.push(data);
      }
      dispatch({
        type: AVAILABILITY_PERIOD_SUBMIT,
        availability: duplicateCheck,
      });
    }
  };
};

/**
 * @author Josef Federspiel
 * @description Dispatches a failed fetch request and resets
 * the status after 5 seconds.
 * @param {function} dispatch Redux dispatch
 * @param {string} err Error message
 */

const areaOfExpertiseFetchFailed = (dispatch, err) => {
  dispatch({
    type: AREA_OF_EXPERTISE_FETCH_FAILED,
    payload: err,
  });
};

/**
 * @author Josef Federspiel
 * @description Dispatches a successful fetch request and resets
 * the status after 5 seconds.
 * @param {function} dispatch Redux dispatch.
 * @param {payload} payload area of expertise.
 */

const areaOfExpertiseReceived = (dispatch, payload) => {
  dispatch({
    type: AREA_OF_EXPERTISE_RECEIVED,
    list: payload,
  });
};

/**
 * @author Josef Federspiel
 * @description Sends A fetch request to the rest api and
 * passes back the response.
 */

const areaOfExpertise = (accessToken) => {
  return new Promise((resolve) => {
    fetch(`${API_URL}/applications/expertise`, {
      headers: {
        'authorization': accessToken,
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
