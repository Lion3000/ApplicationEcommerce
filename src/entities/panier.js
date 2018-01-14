/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');
var ProduitSelectionne = require(appRoot + "/src/entities/produitSelectionne.js");
var sequelize = require(appRoot + "/src/sequelize.js");
var db = sequelize.connection();

const Panier = db.define('panier', {

});

Panier.hasMany(ProduitSelectionne, {as: 'produits'});

Panier.sync({force: false}).then(() => {});

module.exports = Panier;
