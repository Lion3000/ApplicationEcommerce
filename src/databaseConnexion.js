const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://bdbiecpfkwqiqa:09f3c26b0e7d04bc9cf0a31f548e6c02b6d0cc4fef583d78fa5438eb44d0c9a7@ec2-54-217-218-80.eu-west-1.compute.amazonaws.com:5432/dbjg84geapj4kl');

module.exports = sequelize;

