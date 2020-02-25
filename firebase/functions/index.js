//Import Modules
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const expressValidator = require("express-validator");

//Import Routes
const routes = require("./api/routes");

//Setup Express App
const app = express();

//Automatically allow cross-origin requests
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Mount Routes
app.use(routes);

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
