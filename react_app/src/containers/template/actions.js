import { CONSTANT } from './constants';

export const fetchAction = () => {
  return (dispatch) => {
    dispatch({ type: SOME_ACTION });
  };
};
