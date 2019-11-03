import { createActions } from 'redux-actions';

const namedActions = {
  // Application initialization
  requestAppData(fromSignIn=false) {
    return {fromSignIn: fromSignIn}
  },
  appDataLoadingError(exception) {},

  // Sign in
  signIn(credentials) {
    return credentials
  },
  signedIn(user, fromSignIn) {
    return {
        user: user,
        fromSignIn: fromSignIn
    };
  },
  signInEmpty() {},
  signInFailed() {},
  signInError(exception) {},

  // Sign out
  signOut() {},
  signedOut() {},
  signOutError(exception) {},

  // Snackbar
  showSnackbar(variant, message) {
    return {variant:variant, message:message};
  },
  hideSnackbar() {}
};

const actions = createActions(namedActions);

export default actions;