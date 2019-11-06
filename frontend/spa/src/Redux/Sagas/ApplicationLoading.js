import { put, takeLatest } from 'redux-saga/effects';
import actions from '../Actions';
import axios from 'axios';


function* requestAppData(action) {
    try {
        const response = yield axios.get('/api/auth/user/');
        yield put(actions.signedIn(response.data, action.payload.fromSignIn));
    } catch (e) {
        yield put(actions.appDataLoadingError(e));
    }
}


export default function* Saga() {
  yield takeLatest(actions.requestAppData, requestAppData);
}