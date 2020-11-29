const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'FilMnet🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Errors
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(middlewares.enoent);
app.use(middlewares.eexist);
app.use(middlewares.err);


module.exports = app;
