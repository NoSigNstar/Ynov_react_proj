module.exports = {
  /*
    |--------------------------------------------------------------------------
    | Port
    |--------------------------------------------------------------------------
    | Listening TCP port
    |
    */
  port: process.env.PORT || 3080,
  OSRM_URL: 'http://router.project-osrm.org/',
  MAPBOX_URL: 'https://api.mapbox.com/',
  OSRM_VERSIONS: {
    drivingRoute: 'route/v1/',
    matrix: 'table/v1/'
  },
  profile: {
    car: 'driving/',
    foot: 'foot/',
    bike: 'bike/'
  },
  MAPBOX_VERSIONS: {
    matrix: '/directions-matrix/v1/mapbox/driving/'
  },
  jwtSecret: 'Demo',
  jwtSession: {
    session: false
  },
  queryTokenName: 'userToken'
};
