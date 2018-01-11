/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
const Sequelize = require('sequelize');
var sequelize = require("../sequelize.js");
var db = sequelize.connection();

const Categorie = db.define('categorie', {
  nom: {
    type: Sequelize.STRING
  }
});

Categorie.sync({force: false}).then(() => {});

module.exports = Categorie;
