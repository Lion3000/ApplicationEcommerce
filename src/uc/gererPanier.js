/*=======================================
Author : Camélia Benhmida Zarzitski
Date : 14/01/2018
Fichier : vue Gestion des catégories
=======================================*/

var appRoot = require('path').dirname(require.main.filename);
var User = require(appRoot + "/src/entities/user.js");
var ProduitSelectionne = require(appRoot + "/src/entities/produitSelectionne.js");
var Produit = require(appRoot + "/src/entities/produit.js");
var Panier = require(appRoot + "/src/entities/panier.js");
var co = require('co');

var UcGererPanier = {

  //===================================================
  // Cette methode initialise le Uc GererCategorie
  //===================================================
  doIt: function(app) {
    var showForm = co.wrap(UcGererPanier.showForm);
    app.get('/cart', showForm);

  	var applyChangesPanier = co.wrap(UcGererPanier.applyChangesPanier);
  	app.post('/cart', applyChangesPanier);
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
        var successes = [];
        var checkUser = co.wrap(UcGererPanier.checkUser);
        var user = yield checkUser(req.session.userId, errors);
        if (errors.length == 0) {
          var produitWithQuantite = [];
          var panier = yield user.getPanier();
          var produitSelectionnes = yield ProduitSelectionne.findAll({where: { panierId: panier.id }});
          for(var i = 0; i < produitSelectionnes.length; i++){
            var ProduitTmp = { produit : null, quantite : null, id : null };
            ProduitTmp.produit = yield Produit.findById(produitSelectionnes[i].produitId);
            ProduitTmp.quantite = produitSelectionnes[i].quantite;
            ProduitTmp.id = produitSelectionnes[i].id;
            produitWithQuantite.push(ProduitTmp);
          }
         res.render('managePanier', {produits: produitWithQuantite, user: user, errors: errors, successes : successes, userMenu: true});
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
  applyChangesPanier: function * (req, res) {

    if(typeof req.session.userId != 'undefined' && req.session.userId > 0)
    {
        var successes = [];
        var errors = [];
        var checkUser = co.wrap(UcGererPanier.checkUser);
        var user = yield checkUser(req.session.userId, errors);
        if (errors.length == 0) {
          // Si le formulaire de modification a été soumis
          if (typeof req.param('update') != 'undefined'){

            if(req.param('idProduitSelectionne') != "" && req.param('quantite') != ""){
              var produitSelectionne = yield ProduitSelectionne.findById(req.param('idProduitSelectionne'));
              produitSelectionne.quantite = req.param('quantite');
              yield produitSelectionne.save();
              res.redirect('/cart');
            }
            else
              res.redirect('/cart');
          }
          // Si le formulaire de suppression a été soumis
          else if (typeof req.param('delete') != 'undefined'){
            if(req.param('idProduitSelectionne') != ""){
              var produitSelectionne = yield ProduitSelectionne.findById(req.param('idProduitSelectionne'));
              yield produitSelectionne.destroy();
              res.redirect('/cart');
            }
            else
              res.redirect('/cart');
          }
          else if (typeof req.param('valider') != 'undefined'){
            successes.push("Merci de votre Achat !");
            var checkUser = co.wrap(UcGererPanier.checkUser);
            var user = yield checkUser(req.session.userId, errors);

            var produitWithQuantite = [];
            var panier = yield user.getPanier();
            var produitSelectionnes = yield ProduitSelectionne.findAll({where: { panierId: panier.id }});
            for(var i = 0; i < produitSelectionnes.length; i++)
              yield produitSelectionnes[i].destroy();
            res.render('managePanier', {produits: null, user: user, errors: errors, successes : successes, userMenu: true});
          }
        }
        else
          res.redirect('/login');
      }
      else
        res.redirect('/login');
    }
}
module.exports = UcGererPanier;
