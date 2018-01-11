/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
const Sequelize = require('sequelize');
var sequelize = require("../sequelize.js");
var Panier = require("panier.js");
var db = sequelize.connection();

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
Panier.hasOne(User); // ajoute dans user l'id du Panier
User.sync({force: false}).then(() => {});

module.exports = User;
