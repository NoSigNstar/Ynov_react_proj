import { FETCH_USER, DROP_USER_ASYNC, CREATE_USER } from '../actions/userActions';
import { takeLatest, takeEvery } from 'redux-saga/effects';
import { dropUserAsync, userXhr, createUserAsync } from './userMiddleware';
import { ADD_DEST_ROUTE_ASYNC, OPTIMIZE_ROUTE } from '../actions/routeActions';
import { fetchRoute, optimizeRoute } from './destMiddleware';

/** *******************************
 *  SAGAS TAKERS
 */

export function *sagas() {
  yield takeLatest(FETCH_USER, userXhr);
  yield takeLatest(CREATE_USER, createUserAsync);
  yield takeLatest(ADD_DEST_ROUTE_ASYNC, fetchRoute);
  yield takeEvery(OPTIMIZE_ROUTE, optimizeRoute);

  yield takeEvery(DROP_USER_ASYNC, dropUserAsync);
}
