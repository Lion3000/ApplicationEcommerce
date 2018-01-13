/*==============================================================
Author : Alex Zarzitski
Date : 11/01/2018
Objet : UcInscription
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var User = require(appRoot + "/src/entities/user.js");

var UcInscription = {
  
  doIt: function(app) {

    app.get('/signup', function(req, res){
      var errors = [];
      var user = { nom : "", prenom : "", email : "", mdp : "", dateNaissance : "", adresse : "", complementAdresse : "", codePostal : "", isAdmin : false};

      res.render('signup', {user : user, errors : errors});
    });

    

	var fn2 = co.wrap(function (req, res) {
	  resTest = res;
	  var co = require('co');
      var errors = [];
      var user = { nom : "", prenom : "", email : "", mdp : "", dateNaissance : "", adresse : "", complementAdresse : "", codePostal : "", isAdmin : false};

      UcInscription.getUserFromForm(req, user, errors);
	  
	  var result = {ref: -1, error: "test"};
	  
	  var fn = co.wrap(UcInscription.addNewUser);
	  yield fn(user, errors, result);
	  
	  console.log("ICI5<---------------------->");
	  
	  if(result.error != "")
		  errors.push(result.error);
	  
      if(result.ref != -1){
		req.session.idUser = result.ref;
		resTest.redirect('/home');
	  }
      else
        res.render('signup', {user : user, errors : errors});
    });
	
	app.post('/signup', fn2);

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

  addNewUser: function * (user, errors, result) {
	result.ref = -1;
	try{
		console.log("ICI0<---------------------->");
		if (errors.length == 0) {
			var userTmp = yield User.findOne({ where : {email: user.email } });
			console.log("ICI1<---------------------->");
			if (userTmp == null) {
				console.log("ICI2<---------------------->");
				User.create(user);
				user = yield User.findOne({ where : {email: user.email } });
				result.ref = user.id;
			}
			else{
				result.error = "Email deja utilisé !";
				console.log("ICI4<---------------------->");
			}
		}
	}
	catch(e){
		console.log("ICI3<---------------------->" + e);
		//errors.push(e + "");
	}
  }

}

module.exports = UcInscription;
