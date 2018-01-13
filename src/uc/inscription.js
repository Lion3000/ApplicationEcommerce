/*==============================================================
Author : Alex Zarzitski
Date : 11/01/2018
Objet : UcInscription
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var User = require(appRoot + "/src/entities/user.js");
var co = require('co');

var UcInscription = {

  doIt: function(app) {
    app.get('/signup', UcInscription.showForm);

  	var signup = co.wrap(UcInscription.signup);
  	app.post('/signup', signup);
  },

  showForm: function (req, res){
    var errors = [];
    var user = { nom : "", prenom : "", email : "", mdp : "", dateNaissance : "", adresse : "", complementAdresse : "", codePostal : "", isAdmin : false};

    res.render('signup', {user : user, errors : errors});
  },

  signup: function * (req, res) {
    var errors = [];
    var user = { nom : "", prenom : "", email : "", mdp : "", dateNaissance : "", adresse : "", complementAdresse : "", codePostal : "", isAdmin : false};

    UcInscription.getUserFromForm(req, user, errors);

    var userId = {ref: -1};

    var addNewUser = co.wrap(UcInscription.addNewUser);
    yield addNewUser(user, errors, userId);

    console.log("ICI5<---------------------->");

    if(userId.ref != -1){
      req.session.userId = userId.ref;
      res.redirect('/home');
    }
    else
      res.render('signup', {user : user, errors : errors});
  },

  getUserFromForm: function(req, user, errors) {
    if(req.param('name') != "")
      user.nom = req.param('name');
    else
      errors.push("nom");

    if(req.param('surname') != "")
      user.prenom = req.param('surname');
    else
      errors.push("prenom");

    if(req.param('email') != "")
      user.email = req.param('email');
    else
      errors.push("email");

    if(req.param('password') != "")
      user.mdp = req.param('password');
    else
      errors.push("mdp");

    if(req.param('birthday') != "")
      user.dateNaissance = req.param('birthday');
    else
      errors.push("dateNaissance");

    if(req.param('address') != "")
      user.adresse = req.param('address');
    else
      errors.push("adresse");

    if(req.param('address_supplement') != "")
      user.complementAdresse = req.param('address_supplement');
    else
      errors.push("complementAdresse");

    if(req.param('postal_code') != "")
      user.codePostal = req.param('postal_code');
    else
      errors.push("codePostal");
  },

  addNewUser: function * (user, errors, userId) {
  	userId.ref = -1;
  	try{
  		console.log("ICI0<---------------------->");
  		if (errors.length == 0) {
  			var userTmp = yield User.findOne({ where : {email: user.email } });
  			console.log("ICI1<---------------------->");
  			if (userTmp == null) {
  				console.log("ICI2<---------------------->");
  				user = yield User.create(user);
  				userId.ref = user.id;
  			}
  			else{
  				errors.push("Email deja utilisé !");
  				console.log("ICI4<---------------------->");
  			}
  		}
  	}
  	catch(e){
  		errors.push(e + "");
  	}
  }

}

module.exports = UcInscription;
