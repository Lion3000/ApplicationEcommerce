/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');
var sequelize = require(appRoot + "/src/sequelize.js");
var db = sequelize.connection();

const Panier = db.define('panier', {

});

Panier.hasMany(ProduitSelectionne, { onDelete: 'cascade' }); // ajoute idPanier dans ps + getproduitSelectionnes dans panier
User.hasOne(Panier, { onDelete: 'cascade' }); // ajoute idUser dans Panier + get panier dans User

Panier.sync({force: false}).then(() => {});
module.exports = Panier;
