/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');
var sequelize = require(appRoot + "/src/sequelize.js");
//var Produit = require(appRoot + "/src/entities/produit.js");

var db = sequelize.connection();

const Categorie = db.define('categorie', {
  nom: {
    type: Sequelize.STRING
  }
});

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

//Categorie.hasMany(Produit, { onDelete: 'cascade' }); // catérogieId dans produit + getProduits dans catégorie

Categorie.hasMany(Produit, { foreignKeyConstraint: true, as: 'Produits', onDelete: 'CASCADE' }); // catérogieId dans produit + getProduits dans catégorie
Produit.belongsTo(Categorie,  { foreignKeyConstraint: true, onDelete: 'CASCADE' });
Categorie.sync({force: false}).then(() => {});
Produit.sync({force: false}).then(() => {});


//db.sync({ force: true });
module.exports = Categorie;
