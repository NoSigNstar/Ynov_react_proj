const express = require('express');
const jwt = require('jwt-simple');
const config = require('../../config/server');
const passport = require('../lib/AuthStrategy');
const User = require('../../database/models/index').User;

/** **********************************
*      ROUTES AUTHENTICATION
*** */
const routes = express.Router();

routes.post('/token', (req, res) => {
  const jhon = User.findOne({
    attributes: ['id', 'first_name', 'last_name', 'email'],
    where: { login: req.body.login, password: req.body.password }
  }).then((response) => {
    if (!response) {
      res.statusCode = 404;
    }

    res.json({ response: jwt.encode(response, config.jwtSecret) });
  }).catch((err) => {
    const error = `${err.name} ${err.parent.code}`;

    res.statusCode = 500;
    res.json({ response: jwt.encode({ error }, config.jwtSecret) });
  });
});

routes.route('/user')
  .post(passport.auth(), (req, res) => {
    if (req.user.error) {
      res.statusCode = req.user.statusCode;
      req.user = req.user.error;
    }

    res.json(req.user);
  });

routes.route('/create-user')
  .post((req, res) => {
    // #TODO: add check for body params, each are required
    User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      login: req.body.login,
      email: req.body.email
    }).then((response) => {
      res.statusCode = 200;
      res.json({ response: jwt.encode(response, config.jwtSecret) });
    }).catch((error) => {
      res.statusCode = 409;
      res.json({ error: error.errors });
    });
  });

routes.route('/*')
  .get((req, res) => {
    res.status(404).send({ response: 'ERROR 404 - NOT FOUND' });
  })
  .post((req, res) => {
    res.status(404).send({ response: 'ERROR 404 - NOT FOUND' });
  });

module.exports = { routes };
