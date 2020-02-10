import {
  SUBMIT_APPLICATION,
  SUBMIT_APPLICATION_FAILED,
  SUBMIT_APPLICATION_SUCCESS,
  DISCARD_APPLICATION,
} from './constants';
import {AREA_OF_EXPERTISE_FETCH} from '../constants';

export const submitApplication = (data) => {
  return (dispatch, {getFirebase}) => {
    dispatch({type: submitApplication()});
    const auth = getFirebase.auth();
    const uid = auth.getUID();
    const applicationData = {
      ...data,
      uid: uid,
    };
    const createProfileResult = createApplication(applicationData);
    console.log(createProfileResult);
  };
};

const createApplication = (data) => {
  return new Promise((resolve) => {
    fetch(`${API_URL}/users`, {
      method: 'post',
      // Authorization: accessToken,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
        .then((res) => {
          if (!res.ok) {
            resolve(false);
          }

          if (res.status === 200) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          resolve(false);
        });
  });
};
