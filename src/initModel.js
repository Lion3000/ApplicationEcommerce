/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/

var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');

var Categorie = require(appRoot + "/src/entities/categorie.js");
var Produit = require(appRoot + "/src/entities/produit.js");
var ProduitSelectionne = require(appRoot + "/src/entities/produitSelectionne.js");
var Panier = require(appRoot + "/src/entities/panier.js");
var User = require(appRoot + "/src/entities/user.js");

Produit.belongsTo(Categorie,  { foreignKeyConstraint: true, onDelete: 'CASCADE' });
ProduitSelectionne.belongsTo(Produit, { foreignKeyConstraint: true, onDelete: 'CASCADE' }); //ajoute idProduit Dans ProduitSelectionné
Categorie.hasMany(Produit, { foreignKeyConstraint: true, as : 'produits', onDelete: 'CASCADE' }); // catérogieId dans produit + getProduits dans catégorie
Panier.hasMany(ProduitSelectionne, { onDelete: 'CASCADE' }); // ajoute idPanier dans ps + getproduitSelectionnes dans panier
User.hasOne(Panier, { onDelete: 'CASCADE' }); // ajoute idUser dans Panier + get panier dans User
//Panier.belongsTo(User); // ajoute idPanier dans User
//ProduitSelectionne.hasOne(Produit, { foreignKeyConstraint: true }); // getter sur le produit
ProduitSelectionne.belongsTo(Panier, { onDelete: 'CASCADE' });

Categorie.sync({force: false}).then(() => {});
Produit.sync({force: false}).then(() => {});
Panier.sync({force: false}).then(() => {});
ProduitSelectionne.sync({force: false}).then(() => {});
User.sync({force: false}).then(() => {});
