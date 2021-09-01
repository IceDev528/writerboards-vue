const express = require('express');
var history = require('connect-history-api-fallback')
const serveStatic = require("serve-static")
const path = require('path');
// const forceSecure = require("force-secure-express");

const app = express();

// Use a fallback for non-root routes (required for Vue router)
//   NOTE: History fallback must be "used" before the static serving middleware!
app.use(history({
    // OPTIONAL: Includes more verbose logging
    verbose: true
}))

// app.use(serveStatic(path.join(__dirname, '/public')));
app.use(serveStatic(path.join(__dirname, 'dist')));
// app.use(express.static(__dirname + '/public'));

// enable ssl redirect
// app.use(forceSecure([
//     "writerboards.com"
// ]));

const port = process.env.PORT || 80;

app.listen(port);

require('dotenv').config();
