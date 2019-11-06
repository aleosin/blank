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
  signInError() {},

  // Sign out
  signOut() {},
  signedOut() {},
  signOutError(exception) {},

  // Sign up
  signUp(values, setErrors) {return {
    values: values,
    setErrors: setErrors
  }},
  signUpFailed(errors) {return errors},
  signUpError() {},

  resetPassword(values, setErrors) {
    return {
      values: values,
      setErrors: setErrors
    }
  },
  resetPasswordSent(email) {return {
    email: email
  }},
  resetPasswordFailed(errors) {},
  resetPasswordError() {},

  // Snackbar
  showSnackbar(variant, message) {
    return {variant:variant, message:message};
  },
  hideSnackbar() {},


  // Profile
  updateProfile(values) {
    return {values: values};
  },
  updateProfileError() {}
};

const actions = createActions(namedActions);

export default actions;