import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectEmail, selectPassword } from './selectors';
import { loginFormActions as actions } from '.';
import { LoginErrorType } from './types';
import { fetchToken } from 'utils/request';

/**
 * request/response handler
 */
export function* authenticate() {
  const email = yield select(selectEmail);
  const password = yield select(selectPassword);
  if (email.length === 0) {
    yield put(actions.formError(LoginErrorType.EMAIL_EMPTY));
    return;
  }
  if (password.length === 0) {
    yield put(actions.formError(LoginErrorType.PASSWORD_EMPTY));
    return;
  }
  yield put(actions.formError(LoginErrorType.NO_ERROR));
  const requestURL = 'https://backend.127.0.0.1.xip.io/authentication/jwt';
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const headerAndPayloadToken = yield call(fetchToken, requestURL, options);
    const token = headerAndPayloadToken.split(':')[1];
    yield put(actions.authenticatedSuccess(token));
  } catch (error) {
    yield put(actions.authenticatedError(error.response.status));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* LoginFormSaga() {
  yield takeLatest(actions.authenticate, authenticate);
}
