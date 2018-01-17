/*=======================================
Author : Camélia Benhmida Zarzitski
Date : 14/01/2018
Fichier : vue Gestion des catégories
=======================================*/

var appRoot = require('path').dirname(require.main.filename);
var User = require(appRoot + "/src/entities/user.js");
var Categorie = require(appRoot + "/src/entities/categorie.js");
var co = require('co');

var UcGererCategorie = {

  //===================================================
  // Cette methode initialise le Uc GererCategorie
  //===================================================
  doIt: function(app) {
    var showForm = co.wrap(UcGererCategorie.showForm);
    app.get('/category-management', showForm);

  	var applyChangesCategories = co.wrap(UcGererCategorie.applyChangesCategories);
  	app.post('/category-management', applyChangesCategories);
  },

  //===================================================
  // Cette methode vérifie qu'un user est connecté
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
        console.log(e)
        errors.push(JSON.stringify(e));
      }
  },

  showForm: function * (req, res){
      if(typeof req.session.userId != 'undefined' && req.session.userId > 0){
        var errors = [];
        var successes = [];
        var checkUser = co.wrap(UcGererCategorie.checkUser);
        var user = yield checkUser(req.session.userId, errors);
        if (errors.length == 0 && user.isAdmin) {
          var categories = yield Categorie.findAll();
          res.render('manageCategories', {categories: categories, user: user, userMenu: true, successes: successes, errors: errors});
        }
        else
          res.redirect('/login');
    }
    else
        res.redirect('/login');
    },

  //===================================================
  // Cette methode applique les changements en fonction
  // du formulaire soumis
  //===================================================
  applyChangesCategories: function * (req, res) {

    // Si le formulaire d'ajout a été soumis
      if (typeof req.param('add') != 'undefined'){
        if(req.param('nameCategorie') != ""){
          var categorie = { nom : req.param('nameCategorie')};
          categorie = yield Categorie.create(categorie);
          res.redirect('/category-management');
        }
        else
          res.redirect('/category-management');
      }
      // Si le formulaire de modification a été soumis
      else if (typeof req.param('update') != 'undefined'){
        if(req.param('nameCategorie') != "" && req.param('idCategorie') != ""){
          var categorie =yield Categorie.findById(req.param('idCategorie'));
          categorie.nom = req.param('nameCategorie');
          categorie.save();
          res.redirect('/category-management');
        }
        else
          res.redirect('/category-management');
      }
      // Si le formulaire de suppression a été soumis
      else if (typeof req.param('delete') != 'undefined'){
        if(req.param('idCategorie') != ""){
          var categorie =yield Categorie.findById(req.param('idCategorie'));
          categorie.destroy();
          res.redirect('/category-management');
       }
       else
         res.redirect('/category-management');
     }
    // Si aucun formulaire valide n'a été soumis
    else{
      res.redirect('/category-management');
    }
  }
}

module.exports = UcGererCategorie;
