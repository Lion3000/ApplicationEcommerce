/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');
var sequelize = require(appRoot + "/src/sequelize.js");
var ProduitSelectionne = require(appRoot + "/src/entities/produitSelectionne.js");
var db = sequelize.connection();

const Panier = db.define('panier', {

});

Panier.belongsTo(User); // ajoute idPanier dans User

Panier.hasMany(ProduitSelectionne, { onDelete: 'cascade' }); // ajoute idPanier dans ps + getproduitSelectionnes dans panier
Panier.sync({force: false}).then(() => {});

module.exports = Panier;
