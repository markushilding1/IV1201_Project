//Import Modules
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

//Import Routes
const routes = require("./api/routes");

//Setup Express App
const app = express();

app.use(bodyParser.json());

//Automatically allow cross-origin requests
app.use(cors({origin: true }));

//Mount Routes
app.use(routes);

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
