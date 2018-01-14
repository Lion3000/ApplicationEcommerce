/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');
var sequelize = require(appRoot + "/src/sequelize.js");
var Produit = require(appRoot + "/src/entities/produit.js");
var db = sequelize.connection();

const Categorie = db.define('categorie', {
  nom: {
    type: Sequelize.STRING
  }
});
Categorie.hasMany(Produit, {as: 'produits'});
Categorie.sync({force: false}).then(() => {});

module.exports = Categorie;
