/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
const Sequelize = require('sequelize');

var sequelize = require("../sequelize.js");
var db = sequelize.connection();
var Produit = require("produit.js");

const produitSelectionne = db.define('produitSelectionne', {
  quantite: {
    type: Sequelize.INTEGER
  }
});

Produit.hasOne(produitSelectionne); // ajoute dans produitSelectionne l'id du produit

produitSelectionne.sync({force: false}).then(() => {});

module.exports = produitSelectionne;
