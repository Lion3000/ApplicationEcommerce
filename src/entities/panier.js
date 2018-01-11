/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
const Sequelize = require('sequelize');

var sequelize = require("../sequelize.js");
var db = sequelize.connection();

const Panier = db.define('panier', {

});

Panier.hasMany(ProduitSelectionne, {as: 'produits'});

Panier.sync({force: false}).then(() => {});

module.exports = Panier;
