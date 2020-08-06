// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
app.listen(process.env.PORT || 5000)
console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);