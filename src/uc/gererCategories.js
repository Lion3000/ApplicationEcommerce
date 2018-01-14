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
    console.log("--------------------DANS LE UC------------------------");
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
        errors.push(JSON.strigify(e));
      }
  },

  showForm: function * (req, res){
    console.log("DANS SHOW FORM ---------------------------");
      if(typeof req.session.userId != 'undefined' && req.session.userId > 0){
        var errors = [];
        var checkUser = co.wrap(UcGererCategorie.checkUser);
        var user = yield checkUser(req.session.userId, errors);
        if (errors.length == 0) {
          var categories = yield Categorie.findAll();
          res.render('manageCategories', {categories: categories, user: user, userMenu: true});
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
    console.log("!!!!!---------------------------PARAM " + req.param);
    // Si le formulaire d'ajout a été soumis
      if (typeof req.param('add') != 'undefined'){
        console.log("-------------------- DANS ADD  ----------------------------");
        if(req.param('nameCategorie') != ""){
          console.log("-------------------- DANS ADD PARAMETERS OK  ----------------------------");
          var categorie = { nom : req.param('nameCategorie')};
          categorie = yield Categorie.create(categorie);
          res.redirect('/category-management');
        }
        else
          res.redirect('/category-management');
      }
      // Si le formulaire de modification a été soumis
      else if (typeof req.param('update') != 'undefined'){
        console.log("-------------------- DANS UPDATE  ----------------------------");
        if(req.param('nameCategorie') != "" && req.param('idCategorie') != ""){
          console.log("-------------------- DANS UPDATE PARAMETERS OK  ----------------------------");
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
        console.log("-------------------- DANS DELETE ----------------------------");

        if(req.param('idCategorie') != ""){
          console.log("-------------------- DANS DELETE PARAMETERS OK  ----------------------------");

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
