import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../Actions';
import axios from 'axios';


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

export default function* Saga() {
  yield takeLatest(actions.signOut, signOut);
  yield takeLatest(actions.signedOut, signedOut);
}