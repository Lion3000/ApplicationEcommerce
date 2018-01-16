/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');
//var Categorie = require(appRoot + "/src/entities/categorie.js");
//var ProduitSelectionne = require(appRoot + "/src/entities/produitSelectionne.js");
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
Produit.belongsTo(Categorie,  { onDelete: 'CASCADE' });
Categorie.hasMany(Produit, { onDelete: 'cascade' }); // catérogieId dans produit + getProduits dans catégorie
//Produit.belongsToMany(ProduitSelectionne, { onDelete: 'CASCADE' });

Categorie.sync({force: true}).then(() => {});
Produit.sync({force: true}).then(() => {});
//ProduitSelectionne.sync({force: true}).then(() => {});
module.exports = Produit;
