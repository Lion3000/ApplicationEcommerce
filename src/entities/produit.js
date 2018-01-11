/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
const Sequelize = require('sequelize');

var sequelize = require("../sequelize.js");
var db = sequelize.connection();
var Categorie = require("categorie.js");

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
