var sequelize = require("../databaseConnexion.js");
const Sequelize = require('sequelize');
//var sequelize = require(sequelize);

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

User.sync({force: false}).then(() => {
	console.log('USER MODEL SYNCHRO');
  // Table created
});

module.exports = User;

