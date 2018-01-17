/*==============================================================
Author : Alex Zarzitski
Date : 08/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
var UcInscription = require(appRoot + '/src/uc/inscription');
var UcIdentification = require(appRoot + '/src/uc/identification');
var UcGererCompte = require(appRoot + '/src/uc/gererCompte');
var UcGererCategorie = require(appRoot + '/src/uc/gererCategories');
var UcGererProduits = require(appRoot + '/src/uc/gererProduits');
var UcDeconexion = require(appRoot + '/src/uc/deconexion');
var UcGererProfils = require(appRoot + '/src/uc/gererProfils');
var UcVisualiserProduits = require(appRoot + '/src/uc/visualiserProduits');
var UcGererPanier = require(appRoot + '/src/uc/gererPanier');

var co = require('co');

module.exports = {
  start: function(app) {

    app.get('/', function(req, res){
      res.redirect('/home');
    });

  	UcInscription.doIt(app);
  	UcIdentification.doIt(app);
  	UcGererCompte.doIt(app);
  	UcGererCategorie.doIt(app);
    UcGererProduits.doIt(app);
  	UcDeconexion.doIt(app);
  	UcGererProfils.doIt(app);
  	UcVisualiserProduits.doIt(app);
  	UcGererPanier.doIt(app);
  }
}
