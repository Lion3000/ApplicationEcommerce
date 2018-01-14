/*==============================================================
Author : Alex Zarzitski
Date : 14/01/2018
Objet : UcGererCompte
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var User = require(appRoot + "/src/entities/user.js");
var crypto = require('crypto');
var co = require('co');

var UcGererCompte = {

  //===================================================
  // Cette methode initialise le UcGererCompte
  //===================================================
  doIt: function(app) {
    var showForm = co.wrap(UcGererCompte.showForm);
    app.get('/my-account', showForm);

  	var manageAccount = co.wrap(UcGererCompte.manageAccount);
  	app.post('/my-account', manageAccount);
  },

  //===================================================
  // Cette methode affiche le formulaire de modification du compte
  //===================================================
  showForm: function * (req, res){
    if (typeof req.session.userId != 'undefined' && req.session.userId > 0){
      var errors = [];
      var successes = [];

      var checkUser = co.wrap(UcGererCompte.checkUser);
      var user = yield checkUser(req.session.userId, errors);
      if (errors.length == 0) {
        console.log(user);
        res.render('my-account', {user: user, userMenu: true, successes: successes, errors: errors});
      }
      else
        res.redirect('/login');
    }
    else
      res.redirect('/login');
  },

  //===================================================
  // Cette methode tente de modifier ou supprimer le compte
  //===================================================
  manageAccount: function * (req, res) {
    if (typeof req.session.userId != 'undefined' && req.session.userId > 0){
      var errors = [];
      var successes = [];
      var user = { id : req.session.userId};

      var checkUser = co.wrap(UcGererCompte.checkUser);
      yield checkUser(user, errors);
      if (errors.length == 0) {
        res.render('my-account', {user: user, userMenu: true, successes: successes, errors: errors});
      }
      else
        res.redirect('/login');
    }
    else
      res.redirect('/login');
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
  checkUser: function * (userId, errors) {
    try{
      var user = yield User.findById(userId);
      if (user == null)
      	errors.push("Compte non reconnu !");
      else
        return user;
    }
  	catch(e){
      console.log(e);
  		errors.push(JSON.stringify(e));
    }
  }

}

module.exports = UcGererCompte;
