import { put, takeLatest } from 'redux-saga/effects';
import actions from '../Actions';
import axios from 'axios';


function* updateProfile(action) {
    try {
        const response = yield axios.patch('/api/auth/user/', action.payload.values);
        yield put(actions.signedIn(response.data, false));
        yield put(actions.showSnackbar('success', 'Profile information saved!'));
    }
    catch (e) {
        yield put(actions.updateProfileError());
    }
}

function* updateProfileError(action) {
    yield put(actions.showSnackbar('error', 'Profile service is not available, please try later.'));
}


export default function* Saga() {
  yield takeLatest(actions.updateProfile, updateProfile);
  yield takeLatest(actions.updateProfileError, updateProfileError);
}