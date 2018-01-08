var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var app = express();

// config

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

logger.info('server start');

app.get('/', function(req, res){
	
    res.redirect('/ping');
});

app.get('/ping', function(req, res){
	
	montest = require('./src/databaseConnexion');
	let sequelize = montest.test(); // val is "Hello"   
	res.send(sequelize);
  });
    
});

app.listen(process.env.PORT||1313);