import { all } from 'redux-saga/effects';

import ApplicationLoading from './ApplicationLoading';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import ResetPassword from './ResetPassword';

export default function* rootSaga() {
  yield all([
    ApplicationLoading(),
    SignUp(),
    SignIn(),
    SignOut(),
    ResetPassword()
  ])
}