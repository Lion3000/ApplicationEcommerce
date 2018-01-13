/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');

var sequelize = require(appRoot + "/src/sequelize.js");
var db = sequelize.connection();
var Categorie = require("/app/src/entities/categorie.js");

const Produit = db.define('Produit', {
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

Categorie.hasOne(Produit); // ajoute dans produit l'id de la catégorie

Produit.sync({force: false}).then(() => {});

module.exports = Produit;
