/*==============================================================
Author : Alex Zarzitski
Date : 08/01/2018
==============================================================*/
var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var routes = require('./src/routes');
var co = require('co');
var app = express();

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(bodyParser.urlencoded({ extended: false }));
//bodyParser.json()
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)


logger.info('Server start');

var User = require("./src/entities/user.js");

co(
	function *(){
		var user = yield User.create({ firstName : "testFirstName", lastName:"testLastName"});
		user.firstName = "truc";
		user.save();
		
		user2 = yield User.findById(user.id);
		console.log("ICI<-------------------------------------------->" + user.id + " " + user2.id);
		
		user2.destroy();
	}
);


routes.start(app);
logger.info('Set routes OK!');

app.listen(process.env.PORT||1313);