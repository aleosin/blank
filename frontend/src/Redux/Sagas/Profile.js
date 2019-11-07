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

function* updateAvatar(action) {
    const data = new FormData();
    data.append('avatar', action.payload.file)

    try {
        const response = yield axios.patch('/api/auth/user/', data);
        yield put(actions.signedIn(response.data, false));
        yield put(actions.showSnackbar('success', 'Avatar saved!'));
    }
    catch (e) {
        yield put(actions.updateAvatarError());
    }
}

function* updateAvatarError(action) {
    yield put(actions.showSnackbar('error', 'Avatar service is not available, please try later.'));
}

export default function* Saga() {
  yield takeLatest(actions.updateProfile, updateProfile);
  yield takeLatest(actions.updateProfileError, updateProfileError);

  yield takeLatest(actions.updateAvatar, updateAvatar);
  yield takeLatest(actions.updateAvatarError, updateAvatarError);
}