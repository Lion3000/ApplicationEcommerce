/*=======================================
Author : Camélia Benhmida Zarzitski
Date : 14/01/2018
Fichier : vue Gestion des catégories
=======================================*/

var appRoot = require('path').dirname(require.main.filename);
var User = require(appRoot + "/src/entities/user.js");
var Panier = require(appRoot + "/src/entities/panier.js");
var Produit = require(appRoot + "/src/entities/produit.js");
var ProduitSelectionne = require(appRoot + "/src/entities/produitSelectionne.js");
var Categorie = require(appRoot + "/src/entities/categorie.js");
var co = require('co');

var UcVisualiserProduits = {

  //===================================================
  // Cette methode initialise le Uc GererCategorie
  //===================================================
  doIt: function(app) {
    var showForm = co.wrap(UcVisualiserProduits.showForm);
    app.get('/home', showForm);

  	var addToPanier = co.wrap(UcVisualiserProduits.addToPanier);
  	app.post('/home', addToPanier);
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

    var user = { nom : "", prenom : "", email : "", mdp : "", dateNaissance : "", adresse : "", complementAdresse : "", codePostal : "", isAdmin : false};
    if(typeof req.session.userId != 'undefined' && req.session.userId > 0){
      var errors = [];
      var successes = [];
      var checkUser = co.wrap(UcVisualiserProduits.checkUser);
      user = yield checkUser(req.session.userId, errors);
        if (errors.length == 0) {
          user = yield User.findById(req.session.userId);
      }
    }
    var Categories = [];
    var categories = yield Categorie.findAll();
    for(var i = 0; i < categories.length; i++){
      var CategorieTmp = { categorie : null, produits : []};
      CategorieTmp.categorie = categories[i];
      CategorieTmp.produits = yield categories[i].getProduits();
      Categories.push(CategorieTmp);
    }
    res.render('home', {categories: Categories, user : user, userMenu: true});
  },

  //===================================================
  // Cette methode applique les changements en fonction
  // des formulaires soumis
  //===================================================
  addToPanier: function * (req, res) {

    if(typeof req.session.userId != 'undefined' && req.session.userId > 0){
      var errors = [];
      var successes = [];
      var checkUser = co.wrap(UcVisualiserProduits.checkUser);
      var user = yield checkUser(req.session.userId, errors);
        if (errors.length == 0) {
          var currentUser = yield User.findById(req.session.userId);

          var panier = yield currentUser.getPanier();
          if(panier == null){
            var newPanier = { userId : req.session.userId};
            panier = yield Panier.create(newPanier);
          }
          // Si le formulaire d'ajout a été soumis
          if (typeof req.param('add') != 'undefined'){
              if(req.param('idProduit') != "" && req.param('quantite') != ""){
                var produit = Produit.findById(req.param('idProduit'));
                var produitSelectionne = { quantite : req.param('quantite'), produitId : req.param('idProduit'), panierId : panier.id};
                yield ProduitSelectionne.create(produitSelectionne);
                res.redirect('/home');
              }
              else
                res.redirect('/home');
          }
          else
            res.redirect('/home');
        }
        else
          res.redirect('/login');
    }
    else
      res.redirect('/login');
  }
}

module.exports = UcVisualiserProduits;
