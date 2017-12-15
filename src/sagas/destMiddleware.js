import XHR from '../helpers/XHRClient';
import { call, put } from 'redux-saga/effects';
import { store } from '../store';
import _ from 'lodash';
import { addDestinationRoute } from '../actions/routeActions';
import { throws } from 'assert';


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

// =======================================
//        Routes Fetching Section
// =======================================

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

// =======================================
//          Optimizer Section
// =======================================

/**
 * Return url formated with params for the optimization API
 * @param {*Optimizer type} type
 */
function getOptimizeUrl(type) {
  const coordinates = '?coordinates=' + getLatLonQueryString(dests.length, dests);
  const typeUri = '&type=' + action.payload;

  return process.env.optimizeURL + coordinates + typeUri;
}

export function *optimizeRoute(action) {
  const dests = cloneDests();
  if (dests.length < 2) {
    console.error('optimization can\'t be processed. Destination number is below 2');
  }

  // Call optimization
  const optimizedOrder = yield call(XHR.get, getOptimizeUrl(action.payload), {});
  if (optimizedOrder.error) {
    throw new Error('error occured on route optimization');
  }

  console.log(optimizedOrder);
}
