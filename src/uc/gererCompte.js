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

      var checkUser = co.wrap(UcGererCompte.checkUser);
      var user = yield checkUser(req.session.userId, errors);
      if (errors.length == 0) {
        UcGererCompte.editAccount(req, user, errors, successes);
        UcGererCompte.editPasswordAccount(req, user, errors, successes);
        var flag = UcGererCompte.deleteAccount(req, user, errors);
        if(flag){
          res.redirect('/home');
        }
        else
          res.render('my-account', {user: user, userMenu: true, successes: successes, errors: errors});
      }
      else
        res.redirect('/login');
    }
    else
      res.redirect('/login');
  },

  //===================================================
  // Cette methode tente de modifier les informations du compte
  //===================================================
  editAccount: function(req, user, errors, successes) {
    if (typeof req.param('edit') != 'undefined'){
      UcGererCompte.getEditAccountDataFromForm(req, user, errors);
      if(errors.length == 0){
        user.save();
        successes.push("Les informations sur le compte ont été enregistrées!");
      }
    }
  },

  //===================================================
  // Cette methode teste et ramplit le user
  // avec le rendu du formulaire
  //===================================================
  getEditAccountDataFromForm: function(req, user, errors) {
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
  // Cette methode tente de modifier le mot de passe du compte
  //===================================================
  editPasswordAccount: function(req, user, errors, successes) {
    if (typeof req.param('edit_password') != 'undefined'){
      var userData = { mdp : "", newMdp: ""}
      UcGererCompte.getEditAccountDataFromForm(req, userData, errors);
      if(errors.length == 0){
        if( user.mdp == userPassword.mdp){
          user.mdp = userPassword.newMdp;
          user.save();
          successes.push("Le mot de passe a bien été modifié!");
        }
        else {
          errors.push("L'ancien mot de passe est incorrect!");
        }
      }
    }
  },

  //===================================================
  // Cette methode teste et ramplit le nouveau et ancien mot de passe
  // avec le rendu du formulaire
  //===================================================
  getEditPasswordAccountDataFromForm: function(req, user, errors) {
    if(req.param('passwordOld') != "")
      user.mdp = crypto.createHash('sha1').update(req.param('passwordOld')).digest('hex');
    else
      errors.push("L'ancien mot de passe est obligatoire!");

    if(req.param('password') != "")
      user.newMdp = crypto.createHash('sha1').update(req.param('password')).digest('hex');
    else
      errors.push("Le nouveau mot de passe est obligatoire!");
  },

  //===================================================
  // Cette methode tente de supprimer le compte
  //===================================================
  deleteAccount: function(req, user, errors) {
    if (typeof req.param('delete') != 'undefined'){
      var flag = false;
      var userPassword = { mdp : ""}
      UcGererCompte.getDeleteAccountDataFromForm(req, userPassword, errors);
      if(errors.length == 0){
        if( user.mdp == userPassword.mdp){
          user.destroy();
          req.session.userId = 0;
          flag = true;
        }
        else {
          errors.push("Le mot de passe est incorrect!");
        }
      }
      return flag;
    }
  },

  //===================================================
  // Cette methode teste et ramplit l'ancien mot de passe
  // avec le rendu du formulaire
  //===================================================
  getDeleteAccountDataFromForm: function(req, userPassword, errors) {
    if(req.param('password') != "")
      userPassword.mdp = crypto.createHash('sha1').update(req.param('password')).digest('hex');
    else
      errors.push("Le mot de passe est obligatoire !");
  },

  //===================================================
  // Cette methode teste si l'utilisateur existe dans la base de donnée
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
