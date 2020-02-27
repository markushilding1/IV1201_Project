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
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://iv1201-g7.web.app", "iv1201-g7.firebaseapp.com"] }));

//Mount Routes
app.use(routes);

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
