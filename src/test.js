const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

sequelize
  .query('SELECT * FROM User', { model: User })
  .then(projects => {
    // Each record will now be mapped to the project's model.
    console.log(projects)
  })