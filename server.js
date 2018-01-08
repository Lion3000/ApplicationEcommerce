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
sequelize = require('./src/databaseConnexion'); 
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
	res.send('CONNEXION OK');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
	res.send('CONNEXION NOT OK');
  });
    
    
});

app.listen(process.env.PORT||1313);