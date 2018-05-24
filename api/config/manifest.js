const Boom = require('boom');
const Bootstrap = require('./bootstrap');
const Vision = require('vision');
const Inert = require('inert');
const JWTAuth = require('hapi-auth-jwt2');
const { Model } = require('objection');
const knex = require('./knex');
// TODO:
// 1. set up socket.io
// 2. Learn how to connect socket to ui
// 3. be able to emit events from api to ui
// 4. be able to emit events from ui to api

// Register Model knex instance
Model.knex(knex);

// Route Plugins
const aboutRoutes = require('../routes/about');

const server = {
  routes: {
    cors: true,
    validate: {
      options: { abortEarly: false },
      failAction: (request, h, error) => {
        if (!error.data || !error.data.details) {
          if (error.isBoom) {
            return error;
          }
          return Boom.badImplementation(error);
        }
        error.output.payload.validationErrors = error.data.details.map(failure => ({
          message: failure.message,
          type: failure.type,
          key: failure.path,
        }));
        return error;
      },
    },
  },
  port: 9000,
};

module.exports = {
  server,
  register: {
    plugins: [JWTAuth, Inert, Vision, Bootstrap, aboutRoutes],
  },
};
