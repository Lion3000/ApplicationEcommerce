/*==============================================================
Author : Alex Zarzitski
Date : 08/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
require(appRoot+ '/src/initModel');
var routes = require(appRoot+'/src/routes');
var session = require('express-session');
var app = express();

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging
app.use(session({ secret: 'd8z*fz8er7', cookie: { maxAge: 60000*5 }})); // maxAge = expire time

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

logger.info('Server start');
logger.info(appRoot.toString());


routes.start(app);
logger.info('Set routes OK!');

app.listen(process.env.PORT||1313);
