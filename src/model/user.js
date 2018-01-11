var sequelize = require("../../databaseConnexion.js");
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
  // Table created
});

module.exports = User;

