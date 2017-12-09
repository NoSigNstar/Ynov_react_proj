const express = require('express');
const OSRM = require('../wrappers/OSRM');

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

module.exports = {
  routes
};
