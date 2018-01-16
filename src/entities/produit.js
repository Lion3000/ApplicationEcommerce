/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');
//var Categorie = require(appRoot + "/src/entities/categorie.js");
// var ProduitSelectionne = require(appRoot + "/src/entities/produitSelectionne.js");
var sequelize = require(appRoot + "/src/sequelize.js");
var db = sequelize.connection();

const Produit = db.define('produit', {
  nom: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  origine: {
    type: Sequelize.STRING
  },
  prixUnitaire: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.BLOB
  }
});
//Produit.belongsTo(Categorie,  { onDelete: 'CASCADE' });
//Produit.belongsToMany(ProduitSelectionne, { onDelete: 'CASCADE' });

Produit.sync({force: false}).then(() => {});
module.exports = Produit;
