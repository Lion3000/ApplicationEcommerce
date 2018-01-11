/*==============================================================
Author : Alex Zarzitski
Date : 08/01/2018
==============================================================*/
var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var routes = require('./src/routes');
var app = express();

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(bodyParser.urlencoded({ extended: false }));
//bodyParser.json()
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)


logger.info('server start');
routes.start(app);


app.listen(process.env.PORT||1313);
