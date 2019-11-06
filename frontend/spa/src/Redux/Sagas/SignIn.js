import { put, takeLatest } from 'redux-saga/effects';
import actions from '../Actions';
import axios from 'axios';
import { navigate } from '@reach/router';


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

export default function* Saga() {
  yield takeLatest(actions.signIn, signIn);
  yield takeLatest(actions.signedIn, signedIn);
  yield takeLatest(actions.signInEmpty, signInEmpty);
  yield takeLatest(actions.signInFailed, signInFailed);
  yield takeLatest(actions.signInError, signInError);
}