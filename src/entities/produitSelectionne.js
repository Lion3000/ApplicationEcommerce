/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/

var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');

var sequelize = require(appRoot + "/src/sequelize.js");
var db = sequelize.connection();
var Panier = require(appRoot + "/src/entities/panier.js");
var Produit = require(appRoot + "/src/entities/produit.js");

const ProduitSelectionne = db.define('produitSelectionne', {
  quantite: {
    type: Sequelize.INTEGER
  }
});

ProduitSelectionne.belongsTo(Panier, { onDelete: 'CASCADE' }); // ajoute idPanier
ProduitSelectionne.hasOne(Produit); // getter sur le produit

ProduitSelectionne.sync({force: true}).then(() => {});
module.exports = ProduitSelectionne;
