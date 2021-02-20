// Initializes the `graduates` service on path `/graduates`
const { Graduates } = require("./graduates.class");
// const path = require('path');
const createModel = require("../../models/graduates.model");
const hooks = require("./graduates.hooks");
// const filters = require('./graduates.filters');
// const uploader = require('../upload');
// const store = require('fs-blob-store')(path.resolve(__dirname + './graduates.class'));
const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");
const app = express(feathers());
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "public/uploads"), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // getting the file name
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 1e8, // Max field value size in bytes, here it's 100MB
    fileSize: 1e7, //  The max file size in bytes, here it's 10MB
    // files: the number of files
    // READ MORE https://www.npmjs.com/package/multer#limits
  },
});
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
const blobService = require("feathers-blob");
const fs = require("fs-blob-store");
const blobStorage = fs(__dirname + "/uploads");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use(
    "/graduates",
    upload.single("uri"),
    // another middleware, this time to
    // transfer the received file to feathers
    function (req, res, next) {
      // I believe this middleware should only transfer
      // files to feathers and call next();
      // and the mapping of data to the model shape
      // should be in a hook.
      // this code is only for this demo.
      req.feathers.files = req.uri; // transfer the received files to feathers
      // for transforming the request to the model shape

      next();
    },
    new Graduates(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("graduates");

  service.hooks(hooks);
};
