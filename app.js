// Settings
var settings = require( './settings' );

// Express
var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );

// Mongoose
var mongoose = require( 'mongoose' );
mongoose.connect( settings.MONGO_URL );

var db = mongoose.connection;
db.on( 'error', console.error.bind( console, '[ERROR]' ) );
db.on( 'open', function callback () {

});

app.use( bodyParser() );

var server = require( 'http' ).createServer( app ).listen( settings.PORT );
//var io = require('socket.io').listen(server);

var routes = require( './routes/router' );
//var socket = require( './routes/socket' );
//socket( io );
routes.router( app );