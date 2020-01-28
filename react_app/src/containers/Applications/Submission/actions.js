import {
  SUBMIT_APPLICATION,
  SUBMIT_APPLICATION_FAILED,
  SUBMIT_APPLICATION_SUCCESS,
  DISCARD_APPLICATION,
} from './constants';

export const submitApplication = (data) => {
  const {areaOfExpertise, availabilityPeriods} = data;
  return (dispatch) => {
    dispatch({type: SUBMIT_APPLICATION});
  };
};
