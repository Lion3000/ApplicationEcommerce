/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');
var sequelize = require(appRoot + "/src/sequelize.js");
//var Produit = require(appRoot + "/src/entities/produit.js");

var db = sequelize.connection();

const Categorie = db.define('categorie', {
  nom: {
    type: Sequelize.STRING
  }
});

const Produit = db.define('produit', {
  nom: {
    type: Sequelize.STRING
  },
  detail: {
    type: Sequelize.STRING
  },
  origine: {
    type: Sequelize.STRING
  },
  prixUnitaire: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.BLOB,
    allowNull: true
  }
});

const ProduitSelectionne = db.define('produitSelectionne', {
  quantite: {
    type: Sequelize.INTEGER
  }
});

const Panier = db.define('panier', {

});

const User = db.define('user', {
  nom: {
    type: Sequelize.STRING
  },
  prenom: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  mdp: {
    type: Sequelize.STRING
  },
  dateNaissance: {
    type: Sequelize.DATE
  },
  adresse: {
    type: Sequelize.STRING
  },
  complementAdresse: {
    type: Sequelize.STRING
  },
  codePostal: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN
  }
});


User.hasOne(Panier, { onDelete: 'cascade' }); // ajoute idUser dans Panier + get panier dans User

Produit.belongsTo(Categorie,  { foreignKeyConstraint: true, onDelete: 'CASCADE' });
Produit.belongsToMany(ProduitSelectionne,  { foreignKeyConstraint: true, onDelete: 'CASCADE' });
Categorie.hasMany(Produit, { foreignKeyConstraint: true, as : 'produits', onDelete: 'CASCADE' }); // catérogieId dans produit + getProduits dans catégorie
ProduitSelectionne.hasOne(Produit, { foreignKeyConstraint: true }); // getter sur le produit
ProduitSelectionne.belongsTo(Panier, { onDelete: 'CASCADE' });
Panier.hasMany(ProduitSelectionne, { onDelete: 'CASCADE' }); // ajoute idPanier dans ps + getproduitSelectionnes dans panier
Panier.belongsTo(User); // ajoute idPanier dans User
User.hasOne(Panier, { onDelete: 'CASCADE' }); // ajoute idUser dans Panier + get panier dans User

Categorie.sync({force: false}).then(() => {});
Produit.sync({force: false}).then(() => {});
ProduitSelectionne.sync({force: true}).then(() => {});
Panier.sync({force: true}).then(() => {});
User.sync({force: true}).then(() => {});

module.exports = Categorie;
