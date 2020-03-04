import history from './history';

/**
 * @author Markus Hilding
 * @description Used on pages that must not
 * be accessible when the user is signed in.
 * @return {function}
 */
export const checkSignedIn = () => {
  return (_, getState) => {
    const state = getState();
    const auth = state.firebase.auth;
    const user = state.auth.user;
    const signedIn = auth.uid && user;

    if (signedIn) {
      const role = user.role;
      if (role === 'applicant') {
        history.push('/applications');
      } else if (role === 'recruit') {
        history.push('/applicants');
      }
    }

    return;
  };
};
