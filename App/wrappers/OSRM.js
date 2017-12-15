const http = require('node-fetch');
const conf = require('../../config/server');
const Solver = require('../wrappers/OrTools');

const options = {
  overview: 'simplified',
  alternatives: false,
  steps: false,
  geometries: 'geojson'
};

/**
 * Set dynamicly the parameters for the current request
 * @param {*Options for OSRM API} scopOptions
 */
const setParams = (scopOptions) => {
  let params = '';
  for (let opt in scopOptions) {
    if (!scopOptions.hasOwnProperty(opt)) {
      continue;
    }
    params = params + '&' + opt + '=' + scopOptions[opt];
  }
  params = '/?' + params.replace('&', '');
  return params;
};

/**
 * Query an url and return response
 * @param {*Query url} query
 * @param {*the callback called and used as a response, must return the response} callback
 */
const request = (query, callback) => {
  return http(query, { method: 'GET', redirect: 'follow', follow: 20 })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      if (callback && typeof callback === 'function') {
        return callback(json);
      }

      return json;
    })
    .catch((error) => {
      return {error: 'Internal error from OSRM WRAPPER'};
    });
};

/**
 * Fetch and return the routes from OSRM computation
 * @param {*Two points coordinates used to trace the route} coordinates
 * @param {*The options passed in parameters} setup
 */
const compute = (coordinates) => {
  const url = conf.OSRM_URL + conf.OSRM_VERSIONS.drivingRoute + coordinates.join(';') + setParams(options);
  return request(url, undefined);
};

/**
 * Solve the travel salesman problem using OSRM to get the matrix
 * And OrTools as a solver
 * @param {*Points coordinates used to get durations matrix} coordinates
 */
const TCPOptim = (coordinates) => {
  const url = conf.OSRM_URL + conf.OSRM_VERSIONS.matrix + coordinates.join(';');

  return request(url, (json) => {
    if (!json.durations) {
      return json;
    }

    const tspSolverOpts = {
      numNodes: json.durations.length,
      costs: json.durations
    };

    const tspSearchOpts = {
      computeTimeLimit: 1000,
      depotNode: 0
    };

    return Solver.TSP({ solverOpts: tspSolverOpts, searchOpts: tspSearchOpts }, json.durations)
      .then(function (solution, err) {
        if (err) {
          return { error: err };
        }

        return solution;
      });
  });
};

module.exports = {
  options: options,
  compute: compute,
  TCPOptim: TCPOptim
};
