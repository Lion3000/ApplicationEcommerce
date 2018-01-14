/*==============================================================
Author : Alex Zarzitski
Date : 13/01/2018
Objet : UcIdentification
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var User = require(appRoot + "/src/entities/user.js");
var crypto = require('crypto');
var co = require('co');

var UcIdentification = {

  //===================================================
  // Cette methode initialise le UcIdentification
  //===================================================
  doIt: function(app) {
    app.get('/login', UcIdentification.showForm);

  	var login = co.wrap(UcIdentification.login);
  	app.post('/login', login);
  },

  //===================================================
  // Cette methode affiche le formulaire de connexion
  //===================================================
  showForm: function (req, res){
    var user = { email : "", mdp : "", isAdmin : false};
    var errors = [];
    res.render('login', {user: user, errors : errors, userMenu: false});
  },

  //===================================================
  // Cette methode tente de connecté l'utilisateur
  //===================================================
  login: function * (req, res) {
    var user = { email : "", mdp : "", isAdmin : false};
    var errors = [];

    //teste et ramplit le email et le mot de passe avec le rendu du formulaire
    UcIdentification.getUserFromForm(req, user, errors);

    var userId = {ref: -1};

    //teste si l'email et le mot de passe existe dans la base de donnée
    var checkUser = co.wrap(UcIdentification.checkUser);
    yield checkUser(user, errors, userId);

    //si le utilisateur a bien été identifier redirection vers la page home
    if(userId.ref != -1){
      //ajoute l'identifiant d'utilisateur dans la session avent la redirection
      req.session.userId = userId.ref;
      res.redirect('/home');
    }
    //sinon la formulaire s'affiche avec les messages d'erreurs
    else
      res.render('login', {user: user, errors : errors, userMenu: false});
  },

  //===================================================
  // Cette methode teste et ramplit le email et le mot de passe
  // avec le rendu du formulaire
  //===================================================
  getUserFromForm: function(req, user, errors) {
    if(req.param('email') != "")
      user.email = req.param('email');
    else
      errors.push("L'email est obligatoire !");

    if(req.param('password') != "")
      user.mdp = crypto.createHash('sha1').update(req.param('password')).digest('hex');
    else
      errors.push("Le mot de passe est obligatoire !");
  },

  //===================================================
  // Cette methode teste si l'email et le mot de passe existe dans la base de donnée
  //===================================================
  checkUser: function * (user, errors, userId) {
  	userId.ref = -1;
  	try{
  		if (errors.length == 0) {
  			var userTmp = yield User.findOne({ where : {email: user.email, mdp: user.mdp } });
  			if (userTmp != null) {
  				userId.ref = userTmp.id;
  			}
  			else{
  				errors.push("Les identifiants sont incorrects !");
  			}
  		}
  	}
  	catch(e){
      console.log(e);
  		errors.push(JSON.stringify(e));
  	}
  }

}

module.exports = UcIdentification;
