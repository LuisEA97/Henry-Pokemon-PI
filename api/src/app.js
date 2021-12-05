const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors')
require('./db.js');

const server = express();

server.name = 'API';

const whitelist = [
  'https://react-node-pokedex.vercel.app/', 
  'https://react-node-pokedex-git-main-luisea97.vercel.app/', 
  'https://react-node-pokedex-git-dev-luisea97.vercel.app/', 
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

server.use(cors(corsOptions))
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;