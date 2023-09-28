const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'Ajay123@', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
