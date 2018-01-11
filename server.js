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
	
var sequelize = require("./src/databaseConnexion.js");
const Sequelize = require('sequelize');
	
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
	//res.send('CONNEXION OK');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
	res.send(err);
  }); 

var User = require("./src/model/user.js");
User.create({
    firstName: 'TOTO',
    lastName: 'TUTU'
  });
var tab = [];
var userTest;
User.find({ where: { id: '25' } })
  .on('success', function (user) {
    // Check if record exists in db
    if (user) {
      user.updateAttributes({
        firstName: 'DIFFERENT NAME';
		userTest = user;
		res.send(userTest);
      })
      .success(function () {})
    }
  });
  /*
sequelize.query('SELECT * FROM users', { model: User })
  .then(users => {
    // Each record will now be mapped to the project's model.
    users.forEach(function(user){
	tab.push(user);
	});
//console.log(users);
	*/
  
});
app.listen(process.env.PORT||1313);