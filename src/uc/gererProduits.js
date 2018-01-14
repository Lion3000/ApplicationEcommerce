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
    app.get('/category-management', UcGererCategorie.showForm);

  	var applyChangesCategories = co.wrap(UcGererCategorie.applyChangesCategories);
  	app.post('/category-management', applyChangesCategories);
  },

  //===================================================
  // Cette methode vérifie qu'un user est connecté
  //===================================================

  checkUser: function * (user, errors) {
      try{
        user = yield User.findById(user.id);
        if (user == null)
            errors.push("Compte non reconnu !");
      }
      catch(e){
        Console.log(e)
        errors.push(JSON.strigify(e));
      }
  },

  showForm: function * (req, res){
      if(typeof req.session.userId != 'undefined' && req.session.userId > 0){
        var errors = [];
        var user = { id : req.session.userId};

        var checkUser = co.wrap(UcGererCategorie.checkUser);
        yield checkUser(user, errors);
        if (errors.length == 0) {
          var user = { email : "", mdp : "", isAdmin : false};
          var categories = yield Categorie.findAll();
          res.render('manageCategories', {categories: categories, userMenu: true});
        }
        else
          res.redirect('/login');
      }
      else
        res.redirect('/login');
    },

  //===================================================
  // Cette methode applique les changements en fonction
  // des formulaires soumis
  //===================================================
  applyChangesCategories: function * (req, res) {

    // Si le formulaire d'ajout a été soumis
      if(req.param('add') != ""){
        if(req.param('nameProduct') != ""){
          var produit = { nom : req.param('nameCategorie')};
          categorie = yield Categorie.create(categorie);
          var categories = yield Categorie.findAll();
          res.render('manageCategories', {categories: categories, userMenu: true});
        }
      }
      // Si le formulaire de modification a été soumis
      else if (req.param('update') != "") {
        if(req.param('nameCategorie') != "" && req.param('idCategorie') != ""){
          var categorie =yield Categorie.findById(req.param('idCategorie'));
          categorie.nom = req.param('nameCategorie');
          categorie.save();
          var categories = yield Categorie.findAll();
          res.render('manageCategories', {categories: categories, userMenu: true});
       }
      }
      // Si le formulaire de suppression a été soumis
      else if (req.param('delete') != "") {
        if(req.param('idCategorie') != ""){
          var categorie =yield Categorie.findById(req.param('idCategorie'));
          categorie.destroy();
          var categories = yield Categorie.findAll();
          res.render('manageCategories', {categories: categories, userMenu: true});
       }
     }
    // Si aucun formulaire valide n'a été soumis
    else{
      var categories = yield Categorie.findAll();
      res.render('manageCategories', {categories: categories, userMenu: true});
    }
  }
}

module.exports = UcGererCategorie;
