import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../Actions';
import axios from 'axios';


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

export default function* Saga() {
  yield takeLatest(actions.resetPassword, resetPassword);
  yield takeLatest(actions.resetPasswordSent, resetPasswordSent);
  yield takeLatest(actions.resetPasswordError, resetPasswordError);
}