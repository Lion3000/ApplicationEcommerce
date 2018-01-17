/*==============================================================
Author : Camélia Zarzitski
Date : 11/01/2018
==============================================================*/

var appRoot = require('path').dirname(require.main.filename);
const Sequelize = require('sequelize');

var sequelize = require(appRoot + "/src/sequelize.js");
var db = sequelize.connection();

const ProduitSelectionne = db.define('produitSelectionne', {
  quantite: {
    type: Sequelize.INTEGER
  }
});

module.exports = ProduitSelectionne;
