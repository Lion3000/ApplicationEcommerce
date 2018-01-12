/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');

var sequelize = require(appRoot + "/src/sequelize.js");
var db = sequelize.connection();
var Produit = require(appRoot + "/src/entities/produit.js");

const produitSelectionne = db.define('produitSelectionne', {
  quantite: {
    type: Sequelize.INTEGER
  }
});

Produit.hasOne(produitSelectionne); // ajoute dans produitSelectionne l'id du produit

produitSelectionne.sync({force: false}).then(() => {});

module.exports = produitSelectionne;
