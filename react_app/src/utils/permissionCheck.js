import { RESET_NEXT } from './../common/auth/constants';
import history from './history';

/**
 * @author
 * @description Checks if the user has the right permission
 * to view current page. If user not signed in and no sign in
 * is in progress, it redirects to sign in page. If signed in
 * and user has permission to view page, return true, otherwise
 * return false.
 * @param {string} permission [null, applicant, recruiter]
 * @param {string} page page for eventual redirect after sign in
 */
export const permissionCheck = (permission, page) => {
  return (dispatch, getState) => {
    const state = getState();
    const authWaiting = state.auth.authWaiting;
    const auth = state.firebase.auth;
    const user = state.auth.user;
    const userLoading = state.auth.loading;

    if (authWaiting || userLoading) {
      return false;
    } else if (!auth.uid && !authWaiting && permission) {
      history.push(`/sign-in/${page}`);
    } else if (auth.uid && !user && userLoading) {
      return false;
    } else if (auth.uid && user && user.role === permission) {
      return true;
    } else {
      dispatch({ type: RESET_NEXT });
      history.push(`/`);
    }
  };
};
