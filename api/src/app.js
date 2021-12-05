const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors')
require('./db.js');

const server = express();

server.name = 'API';

const corslist = {
  whitelist: [
    'https://react-node-pokedex.vercel.app/', 
    'https://react-node-pokedex-git-main-luisea97.vercel.app/', 
    'https://react-node-pokedex-git-dev-luisea97.vercel.app/', 
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
  ],
  default: 'https://react-node-pokedex.vercel.app/',
}
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
const findURL = (url) => {
  if(whitelist.indexOf(url) !== -1) return url
}
//server.use(cors())
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  var origin = corslist.whitelist.indexOf(req.header('origin').toLowerCase()) > -1 ? req.headers.origin : cors.default;
  console.log(origin)
  res.header('Access-Control-Allow-Origin', origin); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;