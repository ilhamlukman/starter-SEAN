var express 		= require('express');
var path 			= require('path');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');

var app 			= express();
var http 			= require('http').Server(app);

var routes 			= require('./server/routes/index');
var port 			= 1234;

app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req,res,next){
    res.set('X-Powered-By', '@ilhamcilok');
    res.set('X-1', '-17021-10-18360');
    next();
});

app.use('/apps', express.static(__dirname + '/client/apps'));
app.use('/asset', express.static(__dirname + '/client/public'));
app.use('/lib', express.static(__dirname + '/bower_components'));

app.use('/', routes);


http.listen(port, function(){
	console.log('application listen on : ' + port);
});