// Initializes the `graduates` service on path `/graduates`
const { Graduates } = require("./graduates.class");
// const path = require('path');
const createModel = require("../../models/graduates.model");
const hooks = require("./graduates.hooks");
// const filters = require('./graduates.filters');
// const uploader = require('../upload');
// const store = require('fs-blob-store')(path.resolve(__dirname + './graduates.class'));
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const app = express(feathers());
const multer = require('multer');
const multipartMiddleware = multer();
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs(__dirname + '/uploads');


module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/graduates",  multipartMiddleware.single('uri'),

  // another middleware, this time to
  // transfer the received file to feathers
  function(req,res,next){
      req.feathers.file = req.file;
      next();
  },
  new Graduates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("graduates");

  service.hooks(hooks);
};
