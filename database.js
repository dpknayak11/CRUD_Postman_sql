const Sequelize = require('sequelize');

const Sql_DB = new Sequelize(
    'crud-Test',
    'root',
    'root',{
        host: 'localhost',
        dialect: 'mysql'
    }
)

module.exports = Sql_DB;