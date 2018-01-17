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
        errors.push(JSON.strigify(e));
      }
  },

  showForm: function * (req, res){

    var Categories = [];
    var categories = yield Categorie.findAll();
    for(var i = 0; i < categories.length; i++){
      var CategorieTmp = { categorie : null, produits : []};
      CategorieTmp.categorie = categories[i];
      CategorieTmp.produits = yield categories[i].getProduits();
      Categories.push(CategorieTmp);
    }
    res.render('manageProducts', {categories: Categories, user : user, userMenu: true});
  },

  //===================================================
  // Cette methode applique les changements en fonction
  // des formulaires soumis
  //===================================================
  addToPanier: function * (req, res) {

    if(typeof req.session.userId != 'undefined' && req.session.userId > 0){
        var errors = [];
        var user = { id : req.session.userId };

        var checkUser = co.wrap(UcGererproducts.checkUser);
        yield checkUser(user, errors);
        if (errors.length == 0) {
          var currentUser = yield User.findById(req.session.userId);
          // Si le formulaire d'ajout a été soumis
          if (typeof req.param('add') != 'undefined'){
              if(req.param('idProduit') != ""){
                var produit = { nom : req.param('nom'), description : req.param('description'), origine : req.param('origine'), prixUnitaire : req.param('prixUnitaire'), image: null, categorieId : categorie.id};
                produit = yield Produit.create(produit);
                res.redirect('/home');
              }
              else
                res.redirect('/home');
          }
          // Si aucun formulaire valide n'a été soumis
          else
            res.redirect('/home');
        }
    }
}

module.exports = UcVisualiserProduits;
