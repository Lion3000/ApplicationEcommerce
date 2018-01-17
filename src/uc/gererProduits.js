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

  showForm: function * (req, res){
    if(typeof req.session.userId != 'undefined' && req.session.userId > 0){
        var errors = [];

        var checkUser = co.wrap(UcGererProduits.checkUser);
        var user = yield checkUser(req.session.userId, errors);
        if (errors.length == 0 && user.isAdmin) {
          var Categories = [];
          var categories = yield Categorie.findAll();
          if(categories != null)
            for(var i = 0; i < categories.length; i++){
              var CategorieTmp = { categorie : null, produits : []};
              CategorieTmp.categorie = categories[i];
              CategorieTmp.produits = yield categories[i].getProduits();
              Categories.push(CategorieTmp);
            }
          res.render('manageProducts', {categories: Categories, user : user, userMenu: true});
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
  applyChangesProducts: function * (req, res) {
    if(typeof req.session.userId != 'undefined' && req.session.userId > 0){
        var errors = [];

        var checkUser = co.wrap(UcGererProduits.checkUser);
        var user = yield checkUser(req.session.userId, errors);
        if (errors.length == 0 && user.isAdmin) {
          // Si le formulaire d'ajout a été soumis
          if (typeof req.param('add') != 'undefined'){
            if(req.param('idCategorie') != "" && req.param('nom') != "" && req.param('details') != "" && req.param('prixUnitaire') != "" && req.param('origine') != "")
            {
              var categorie = yield Categorie.findById(req.param('idCategorie'));
              var produit = { nom : req.param('nom'), detail : req.param('detail'), origine : req.param('origine'), prixUnitaire : req.param('prixUnitaire'), image: req.param('profilepic'), categorieId : categorie.id};
              produit = yield Produit.create(produit);
              res.redirect('/product-management');
            }
            else
              res.redirect('/product-management');
          }
          // Si le formulaire de modification a été soumis
          else if (typeof req.param('update') != 'undefined'){
            if(req.param('idProduit') != "" && req.param('nom') != "" && req.param('detail') != "" && req.param('prixUnitaire') != "" && req.param('origine') != "")
            {
              var produit = yield Produit.findById(req.param('idProduit'));
              produit.prixUnitaire = req.param('prixUnitaire');
              produit.detail = req.param('detail');
              produit.origine = req.param('origine');
              produit.nom = req.param('nom');
              if(req.param('profilepic') != "")
                produit.image = req.param('profilepic');
              produit.save();
              res.redirect('/product-management');
            }
            else
              res.redirect('/product-management');
            }
            // Si le formulaire de suppression a été soumis
            else if (typeof req.param('delete') != 'undefined'){
              if(req.param('idProduit') != ""){
                var produit = yield Produit.findById(req.param('idProduit'));
                produit.destroy();
              res.redirect('/product-management');
            }
            else
              res.redirect('/product-management');
          }
          // Si aucun formulaire valide n'a été soumis
          else
            res.redirect('/product-management');
        }
        else
          res.redirect('/login');
      }
      else
        res.redirect('/login');
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
      console.log(e);
  		errors.push(JSON.stringify(e));
    }
  }

}

module.exports = UcGererProduits;
