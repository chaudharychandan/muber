const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes');
const connection = require('./db/connection');
const errorResponseHandler = require('./middlewares/errorResponseHandler');

connection();
const app = express();

app.use(bodyParser.json());
routes(app);
app.use(errorResponseHandler);

module.exports = app;
