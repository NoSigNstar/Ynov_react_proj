import XHR from '../helpers/XHRClient';
import { addUser, dropUser } from '../actions/userActions';
import { formatTokenResponse, addUserToLocalStorage } from './helpers';
import { call, put } from 'redux-saga/effects';
import { registerError, connectionError } from '../actions/errorsAction';
import { connectionSuccess } from '../actions/successActions';

function processUser(response) {
  const user = formatTokenResponse(response);
  const completeName = user.first_name + ' ' + user.last_name;
  addUserToLocalStorage(user);
  return { user, completeName };
}

// =======================================
//        User Fetching Section
// =======================================

/**
 * Contact the API in order to get the corresponding account
 * @param {*User data} action
 */
function *userXhr(action) {
  const data = {
    body: XHR._formatQuery('POST', action.payload)
  };

  try {
    const response = yield call(XHR.post, 'http://localhost:3080/auth/token', data);

    if (response.error) {
      yield put(connectionError(response.error));
      return;
    }

    const entity = processUser(response);

    yield put(addUser(entity.user));
    yield put(connectionSuccess(entity.completeName));
  } catch (e) {
    console.error('error', e); // call redux state for error management
  }
}

// =======================================
//        User Creation Section
// =======================================

/**
 * Contact the API in order to create a new account
 * @param {*Contain data for the new user} action
 */
function *createUserAsync(action) {
  const data = {
    body: XHR._formatQuery('POST', action.payload)
  };

  try {
    const response = yield call(XHR.post, process.env.createUserUrl, data);

    if (response.error) {
      yield put(registerError(response.error));
      return;
    }

    const entity = processUser(response);

    yield put(addUser(entity.user));
    yield put(connectionSuccess(entity.completeName));
  } catch (e) {
    console.error({ error: 'from create User Sagas', e });
  }
}

/**
 * Remove the current user from the session storage
 * @param {*Empty action} action
 */
function *dropUserAsync(action) {
  try {
    self.sessionStorage.clear();
    yield put(dropUser());
  } catch (e) {
    console.error('sagas error: ', e);
  }
}

export { dropUserAsync, userXhr, createUserAsync };
