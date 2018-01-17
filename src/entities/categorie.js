/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/
var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');
var sequelize = require(appRoot + "/src/sequelize.js");

var db = sequelize.connection();

const Categorie = db.define('categorie', {
  nom: {
    type: Sequelize.STRING
  }
});

module.exports = Categorie;
