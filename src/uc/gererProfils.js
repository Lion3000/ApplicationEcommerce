/*==============================================================
Author : Alex Zarzitski
Date : 14/01/2018
Objet : UcGererProfils
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var User = require(appRoot + "/src/entities/user.js");
var crypto = require('crypto');
var co = require('co');

var UcGererProfils = {

  //===================================================
  // Cette methode initialise le UcGererProfils
  //===================================================
  doIt: function(app) {
    var showForm = co.wrap(UcGererProfils.showForm);
    app.get('/profile-management', showForm);

  	var manageProfiles = co.wrap(UcGererProfils.manageProfiles);
  	app.post('/profile-management', manageProfiles);
  },

  //===================================================
  // Cette methode affiche le formulaire de modification du compte
  //===================================================
  showForm: function * (req, res){
    if (typeof req.session.userId != 'undefined' && req.session.userId > 0){
      var errors = [];
      var successes = [];

      var checkUser = co.wrap(UcGererProfils.checkUser);
      var user = yield checkUser(req.session.userId, errors);
      if (errors.length == 0 && user.isAdmin) {
        if(typeof req.param('userId') != 'undefined'){
          var selectedUser = yield checkUser(req.param('userId'), errors);
          res.render('manageProfile', {user: user, selectedUser: selectedUser, userMenu: true, successes: successes, errors: errors});
        }
        else{
          var users = yield User.findAll();
          res.render('manageProfiles', {user: user, users: users, userMenu: true, successes: successes, errors: errors});
        }
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
  manageProfiles: function * (req, res) {
    if (typeof req.session.userId != 'undefined' && req.session.userId > 0){
      var errors = [];
      var successes = [];

      var checkUser = co.wrap(UcGererProfils.checkUser);
      var user = yield checkUser(req.session.userId, errors);
      if (errors.length == 0 && user.isAdmin) {
        if(typeof req.query('userId') != 'undefined'){
          var selectedUser = yield checkUser(req.query('userId'), errors);

          /*var editUser = co.wrap(UcGererProfils.editUser);
          yield editUser(req, errors, successes);*/

          if(errors.length == 0)
            res.render('manageProfile', {user: user, selectedUser: selectedUser, userMenu: true, successes: successes, errors: errors});
          else
            res.redirect('/profile-management');
        }
        else{
          var deletetUser = co.wrap(UcGererProfils.deletetUser);
          yield deletetUser(req, errors, successes);

          var users = yield User.findAll();
          res.render('manageProfiles', {user: user, users: users, userMenu: true, successes: successes, errors: errors});
        }
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
  editUser: function * (req, errors, successes) {
    if (typeof req.query('edit') != 'undefined' && typeof req.param('userId') != 'undefined'){
      try{
        var user = yield User.findById(req.query('edit'));
        if (user == null)
          errors.push("Compte non reconnu !");
      }
      catch(e){
        console.log(e);
        errors.push(JSON.stringify(e));
      }
      if(errors.length == 0){
        UcGererCompte.getEditUserDataFromForm(req, user, errors);
        if(errors.length == 0){
          user.save();
          successes.push("Les informations du profile ont été enregistrées!");
        }
      }
    }
  },

  //===================================================
  // Cette methode teste et ramplit le user
  // avec le rendu du formulaire
  //===================================================
  getEditUserDataFromForm: function(req, user, errors) {
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
  // Cette methode
  //===================================================
  deletetUser: function * (req, errors, successes) {
    var UcGererProfils = require(appRoot + '/src/uc/gererProfils');
    if (typeof req.param('delete') != 'undefined'){
      try{
        var user = yield User.findById(req.param('userId'));
        if (user == null)
        	errors.push("Compte non reconnu !");
      }
    	catch(e){
        console.log(e);
    		errors.push(JSON.stringify(e));
      }
      if(errors.length == 0){
          user.destroy();
          successes.push("Le compte a été supprimé!");
      }
    }
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

module.exports = UcGererProfils;
