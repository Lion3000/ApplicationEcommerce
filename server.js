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
	
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://bdbiecpfkwqiqa:09f3c26b0e7d04bc9cf0a31f548e6c02b6d0cc4fef583d78fa5438eb44d0c9a7@ec2-54-217-218-80.eu-west-1.compute.amazonaws.com:5432/dbjg84geapj4kl');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
	//res.send('CONNEXION OK');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
	res.send(err);
  }); 

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: false}).then(() => {
  // Table created
  User.create({
    firstName: 'Johnny',
    lastName: 'Han'
  });
});
sequelize.query("SELECT * FROM Users").then(myTableRows => {
  console.log(myTableRows);
  res.send(myTableRows);
})

});

app.listen(process.env.PORT||1313);