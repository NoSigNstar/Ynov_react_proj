import { formatTokenResponse, addUserToLocalStorage } from './helpers';
import XHR from '../helpers/XHRClient';
import { call, put } from 'redux-saga/effects';
import { store } from '../store';
import _ from 'lodash';
import { addDestinationRoute } from '../actions/destinationActions';


function cloneDests() {
  return _.cloneDeep(store.getState().destination);
}

/**
 * Return a query formated for
 * @param {*Number of iteration} size
 * @param {*Collection on wich we wanna itarate} collection
 */
function getLatLonQueryString(size, collection) {
  let query = '';
  for (let i = 0; i < size; i++) {
    if (!collection[i].lat && !collection[i].lon) {
      continue;
    }
    query = query + (collection[i].lon + ',' + collection[i].lat);
    if (i < size - 1) {
      query = query + ';';
    }
  }
  return query;
}

/**
 * Fetch API to get the route between POI
 * @param{*The current action} action
 */
export function *fetchRoute(action) {
  const dests = cloneDests();
  let query = getLatLonQueryString(dests.length, dests);
  const route = yield call(XHR.get, process.env.computeRouteUrl + '?coordinates=' + query, {});
  if (!route || route.error) {
    throw new Error('response not handled', route);
  }
  yield put(addDestinationRoute(route));
}

