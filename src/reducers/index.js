import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { User } from './User';
import { Destinations } from './map/Destinations';
import { route } from './map/DestinationRoute';
import { Marker } from './map/DescriptionMarker';
import { Grade } from './map/GradeMarker';
import { notifyDispatcher } from './NotifyDispatcher';

export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  user: User,
  destination: Destinations,
  routes: route,
  marker: Marker,
  grade: Grade,
  notifyDispatcher: notifyDispatcher
});
