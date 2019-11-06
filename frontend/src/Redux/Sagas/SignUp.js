import { put, takeLatest } from 'redux-saga/effects';
import actions from '../Actions';
import axios from 'axios';
import { navigate } from '@reach/router';


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

export default function* Saga() {
  yield takeLatest(actions.signUp, signUp);
  yield takeLatest(actions.signUpError, signUpError);
}