import { call, put, takeLatest } from 'redux-saga/effects'
import actions from './Actions';
import axios from 'axios';
import { navigate } from "@reach/router"

function* requestAppData(action) {
    try {
        const response = yield axios.get('/api/auth/user/');
        yield put(actions.signedIn(response.data, action.payload.fromSignIn));
    } catch (e) {
        yield put(actions.appDataLoadingError(e));
    }
}

function* signOut(action) {
    try {
        yield call(axios.post, '/api/auth/logout/');
        yield put(actions.signedOut());
    } catch (e) {
        yield put(actions.signOutError(e));
    }
}

function* signedOut(action) {
    yield put(actions.showSnackbar('success', 'You have signed out!'));
}

function* signIn(action) {
    try {
        yield axios.post('/api/auth/login/', action.payload);
        yield put(actions.requestAppData(true));
        yield navigate('/');
    }
    catch (e) {
        if (e.response.status === 400) {
            yield put(actions.signInFailed());
        }
        else {
            yield put(actions.signInError());
        }
    }
}

function* signInEmpty(action) {
    yield put(actions.showSnackbar('info', 'Please enter email and password.'));
}

function* signInFailed(action) {
    yield put(actions.showSnackbar('error', 'User name or password are not valid!'));
}

function* signInError(action) {
    yield put(actions.showSnackbar('error', 'Sign in service is not available, please try later.'));
}

function* signedIn(action) {
    if (action.payload.fromSignIn) {
        yield put(actions.showSnackbar('success', `You have signed in as ${action.payload.user.username}!`));
    }
}

function* signUp(action) {
    const {email, password1, password2} = action.payload.values;
    const setErrors = action.payload.setErrors;

    try {
        yield axios.post('/api/auth/registration/', {
            email: email,
            password1: password1,
            password2: password2,
        });
        yield navigate('/sign-in');
        yield put(actions.showSnackbar('success', `You have created account for ${email}!`));
    }
    catch (e) {
        if (e.response.status === 400) {
            const errors = e.response.data;
            setErrors(errors);

            if (errors.non_field_errors) {
                yield put(actions.showSnackbar('error', errors.non_field_errors.join(' ')));
            }

            yield put(actions.signUpFailed(e.response.data));
        }
        else {
            yield put(actions.signUpError());
        }
    }
}

function* signUpError(action) {
    yield put(actions.showSnackbar('error', 'Sign up service is not available, please try later.'));
}

function* resetPassword(action) {
    const {email} = action.payload.values;
    const setErrors = action.payload.setErrors;

    try {
        yield call(axios.post, '/api/auth/password/reset/', {
            email: email
        });
        yield put(actions.resetPasswordSent(email));
    } catch (e) {
        if (e.response.status === 400) {
            const errors = e.response.data;
            setErrors(errors);

            if (errors.non_field_errors) {
                yield put(actions.showSnackbar('error', errors.non_field_errors.join(' ')));
            }

            yield put(actions.resetPasswordFailed(e.response.data));
        }
        else {
            yield put(actions.resetPasswordError());
        }
    }
}

function* resetPasswordSent(action) {
    yield put(actions.showSnackbar('success', `We've sent you reset instructions to ${action.payload.email}!`));
}

function* resetPasswordError(action) {
    yield put(actions.showSnackbar('error', 'Reset password service is not available, please try later.'));
}

function* Saga() {
  yield takeLatest(actions.requestAppData, requestAppData);
  
  yield takeLatest(actions.signIn, signIn);
  yield takeLatest(actions.signedIn, signedIn);
  yield takeLatest(actions.signInEmpty, signInEmpty);
  yield takeLatest(actions.signInFailed, signInFailed);
  yield takeLatest(actions.signInError, signInError);

  yield takeLatest(actions.signOut, signOut);
  yield takeLatest(actions.signedOut, signedOut);

  yield takeLatest(actions.signUp, signUp);
  yield takeLatest(actions.signUpError, signUpError);

  yield takeLatest(actions.resetPassword, resetPassword);
  yield takeLatest(actions.resetPasswordSent, resetPasswordSent);
  yield takeLatest(actions.resetPasswordError, resetPasswordError);
}

export default Saga;