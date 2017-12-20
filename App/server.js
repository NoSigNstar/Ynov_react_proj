const express = require('express');

const app = express();
const http = require('http');
const api = require('./routes/api');
const auth = require('./routes/authentication');
const routeFromPosition = require('./routes/RouteFromPosition');
const chat = require('./lib/chat');
const serverConf = require('../config/server');
const bodyParser = require('body-parser');
const authStrategy = require('./lib/AuthStrategy');

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(authStrategy.initialize());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/api', api.v01);
app.use('/auth', auth.routes);
app.use('/routes', routeFromPosition.routes);


chat.listen(server);

server.listen(serverConf.port);

module.exports = server;
