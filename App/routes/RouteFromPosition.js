const express = require('express');
const OSRM = require('../wrappers/OSRM');
const Solver = require('../wrappers/OrTools');

/** **********************************
 *      Routes Two Points
 *** */
const routes = express.Router();

/**
 * Handle route computation for two points
 */
routes.route('/')
  .get(function (req, res) {
    const coordinates = req.query.coordinates && req.query.coordinates.split(';');
    if (!coordinates && coordinates.length !== 2) {
      return res.status(400).json({ error: 'coordinates params falsy' });
    }

    OSRM.options.overview = req.query.overview || OSRM.options.overview;
    OSRM.options.alternatives = req.query.alternatives || OSRM.options.alternatives;
    OSRM.options.steps = req.query.steps || OSRM.options.steps;

    OSRM.compute(coordinates).then((response) => {
      res.status(200);
      return res.json(response);
    }).catch((error) => {
      res.status(500);
      return res.json({ error: error });
    });
  });

routes.route('/optimize')
  .get(function (req, res) {
    let costs = [
      [0, 10, 20, 30],
      [10, 0, 10, 10],
      [10, 10, 0, 10],
      [50, 10, 10, 0]
    ];

    let tspSolverOpts = {
      numNodes: 4,
      costs: costs
    };

    let tspSearchOpts = {
      computeTimeLimit: 1000,
      depotNode: 0
    };

    Solver.TSP({
      solverOpts: tspSolverOpts,
      searchOpts: tspSearchOpts
    },
    costs).then(function (err, solution) {
      if (err) {
        return res.json(err);
      }

      return res.json(solution);
    });
  });

module.exports = {
  routes
};
