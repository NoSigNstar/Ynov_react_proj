import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { router } from './router.js';
import 'semantic-ui-css/semantic.min.css';
import 'react-notifications/lib/notifications.css';

process.env.MapboxKey = 'pk.eyJ1IjoianVoMzMiLCJhIjoiY2o5ZnZnMnpyMDQ1ajJxcnFoeXZuZWp6eCJ9.ECUpg6xQI-XcMTjfiZcvyw';
process.env.SocketUrl = 'http://localhost:3080';
process.env.api = process.env.SocketUrl + '/api/';
process.env.NominationUrl = 'http://nominatim.openstreetmap.org/search.php?';
process.env.MapboxTilesStyle = 'mapbox://styles/mapbox/streets-v10';

process.env.createUserUrl = 'http://localhost:3080/auth/create-user';
process.env.authTokenUrl = 'http://localhost:3080/auth/token';

process.env.computeRouteUrl = 'http://localhost:3080/routes/';

/**
 * Type of optimization, do not take constraint the same way
 */
process.env.optimizerType = {
  VRP: { name: 'VRP', icon: 'time', description: 'VRP is what is the most powerfull, you can ask for time windows to make sur that you will be able to visits all the bar at happy hours' },
  TCP: { name: 'TCP', icon: 'map', description: 'TCP is the basic solver for your barathon, it will take into account only the distance between bars thats you selected' }
};
process.env.optimizeURL = 'http://localhost:3080/routes/optimize';

// render the main component
ReactDOM.render(
  <Provider store={store}>
    {router()}
  </Provider>,
  document.getElementById('app')
);
