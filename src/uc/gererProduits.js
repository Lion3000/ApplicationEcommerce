/*=======================================
Author : Camélia Benhmida Zarzitski
Date : 14/01/2018
Fichier : vue Gestion des catégories
=======================================*/

var appRoot = require('path').dirname(require.main.filename);
var User = require(appRoot + "/src/entities/user.js");
var Produit = require(appRoot + "/src/entities/produit.js");
var Categorie = require(appRoot + "/src/entities/categorie.js");
var co = require('co');

var UcGererProduits = {

  //===================================================
  // Cette methode initialise le Uc GererCategorie
  //===================================================
  doIt: function(app) {
    var showForm = co.wrap(UcGererProduits.showForm);
    app.get('/product-management', showForm);

  	var applyChangesProducts = co.wrap(UcGererProduits.applyChangesProducts);
  	app.post('/product-management', applyChangesProducts);
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
      if(typeof req.session.userId != 'undefined' && req.session.userId > 0){
        var errors = [];
        var user = { id : req.session.userId};

      //  var checkUser = co.wrap(UcGererproducts.checkUser);
      //  yield checkUser(user, errors);
        if (errors.length == 0) {
          var user = { email : "", mdp : "", isAdmin : false};
          var categories = yield Categorie.findAll();
          res.render('manageProducts', {categories: categories, user : user, userMenu: true});
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
        if(req.param('idCategorie') != "" && req.param('nom') != "" && req.param('description') != "" && req.param('prixUnitaire') != "" && req.param('origine') != ""  && req.param('picture') != "" )
        {
          var categorie = yield Categorie.findById(req.param('idCategorie'));
          var produit = { nom : req.param('nom'), description : req.param('description'), origine : req.param('origine'), prixUnitaire : req.param('prixUnitaire'), image: req.param('picture'), categorie : categorie};
          produit = yield Produit.create(produit, { include: [ Categorie ] });
          yield categorie.addProduit(produit);
          res.redirect('/product-management');
        }
      }
      // Si le formulaire de modification a été soumis
      else if (req.param('update') != "") {
        if(req.param('idProduit') != "" && req.param('nom') != "" && req.param('description') != "" && req.param('prixUnitaire') != "" && req.param('origine') != "")
        {
          var produit = yield Produit.findById(req.param('idProduit'));
          produit.prixUnitaire = req.param('prixUnitaire');
          produit.description = req.param('description');
          produit.origine = req.param('origine');
          produit.nom = req.param('nom');
          produit.save();
          res.redirect('/product-management');
        }
      }
      // Si le formulaire de suppression a été soumis
      else if (req.param('delete') != "") {
        if(req.param('idProduit') != ""){
          var produit = yield Produit.findById(req.param('idProduit'));
          produit.destroy();
        res.redirect('/product-management');
       }
     }
    // Si aucun formulaire valide n'a été soumis
    else
      res.redirect('/product-management');
  }
}

module.exports = UcGererProduits;
