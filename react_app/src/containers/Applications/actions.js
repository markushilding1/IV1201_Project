import {API_URL} from './constants.js';
/**
 * @author Josef Federspiel
 * @description Gets the different areas of expertise listed in the database.
 */

export const getAreaOfExpertise = async (dispatch) => {
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

