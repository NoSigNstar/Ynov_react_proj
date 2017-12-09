const express = require('express');

/** **********************************
 *      ROUTES API V01
 *** */
const v01 = express.Router();

v01.use((req, res, next) => {
  // Some MiddleWare logic there
  next();
});

v01.get('/', (req, res) => {
  // Render some JsonStuff
});


module.exports = {
  v01
};
