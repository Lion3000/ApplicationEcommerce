const Sequelize = require('sequelize');
/*const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'|'sqlite'|'postgres'|'mssql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
*/

// Or you can simply use a connection uri

const sequelize = new Sequelize('postgres://ypnwjyoiuqmmms:e31b29063e6839403856f873898a631e4961b9182ca850dd501a8fcc6d51456a@ec2-54-217-218-80.eu-west-1.compute.amazonaws.com:5432/d8351obpq7q3lm');

export function test() {
	
  return sequelize;
}