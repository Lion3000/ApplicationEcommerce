/*==============================================================
Author : Alex Zarzitski
Date : 11/01/2018
Objet : UcInscription
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var User = require(appRoot + "/src/entities/user.js");
var crypto = require('crypto');
var co = require('co');

var UcInscription = {

  //===================================================
  // Cette methode initialise le UcInscription
  //===================================================
  doIt: function(app) {
    app.get('/signup', UcInscription.showForm);

  	var signup = co.wrap(UcInscription.signup);
  	app.post('/signup', signup);
  },

  //===================================================
  // Cette methode affiche le formulaire d'inscription
  //===================================================
  showForm: function (req, res){
    var errors = [];
    var user = { nom : "", prenom : "", email : "", mdp : "", dateNaissance : "", adresse : "", complementAdresse : "", codePostal : "", isAdmin : false};

    res.render('signup', {user : user, errors : errors, userMenu: false});
  },

  //===================================================
  // Cette methode tente d'inscrire un nouvel utilisateur
  //===================================================
  signup: function * (req, res) {
    var errors = [];
    var user = { nom : "", prenom : "", email : "", mdp : "", dateNaissance : "", adresse : "", complementAdresse : "", codePostal : "", isAdmin : false};

    //teste et ramplit les attributs du nouvel utilisateur avec le rendu du formulaire
    UcInscription.getUserFromForm(req, user, errors);

    var userId = {ref: -1};

    //ajoute le nouvel utilisateur à la base de donnée si le mail n'est pas déja utilisé
    var addNewUser = co.wrap(UcInscription.addNewUser);
    yield addNewUser(user, errors, userId);

    //si le utilisateur a bien été inscrit redirection vers la page home
    if(userId.ref != -1){
      //ajoute l'identifiant du nouvel utilisateur dans la session avent la redirection
      req.session.userId = userId.ref;
      res.redirect('/home');
    }
    //sinon la formulaire s'affiche avec les messages d'erreurs
    else
      res.render('signup', {user : user, errors : errors, userMenu: false});
  },

  //===================================================
  // Cette methode teste et ramplit les attributs du nouvel utilisateur
  // avec le rendu du formulaire
  //===================================================
  getUserFromForm: function(req, user, errors) {
    if(req.param('name') != "")
      user.nom = req.param('name');
    else
      errors.push("Le nom est obligatoire !");

    if(req.param('surname') != "")
      user.prenom = req.param('surname');
    else
      errors.push("Le prenom est obligatoire !");

    if(req.param('email') != "")
      user.email = req.param('email');
    else
      errors.push("L'email est obligatoire !");

    if(req.param('password') != ""){
      user.mdp = crypto.createHash('sha1').update(req.param('password')).digest('hex');
    }
    else
      errors.push("Le mot de passe est obligatoire !");

    if(req.param('birthday') != "")
      user.dateNaissance = req.param('birthday');
    else
      errors.push("La date de naissance est obligatoire !");

    if(req.param('address') != "")
      user.adresse = req.param('address');
    else
      errors.push("L'adresse est obligatoire !");

    user.complementAdresse = req.param('address_supplement');

    if(req.param('postal_code') != "")
      user.codePostal = req.param('postal_code');
    else
      errors.push("Le code postal est obligatoire !");
  },

  //===================================================
  // Cette methode ajoute le nouvel utilisateur à la base de donnée,
  // si le mail n'est pas déja utilisé
  //===================================================
  addNewUser: function * (user, errors, userId) {
  	userId.ref = -1;
  	try{
  		if (errors.length == 0) {
  			var userTmp = yield User.findOne({ where : {email: user.email } });
  			if (userTmp == null) {
  				user = yield User.create(user);
  				userId.ref = user.id;
  			}
  			else{
  				errors.push("Le mail est déja utilisé !");
  			}
  		}
  	}
  	catch(e){
      console.log(e);
  		errors.push(JSON.stringify(e));
  	}
  }

}

module.exports = UcInscription;
