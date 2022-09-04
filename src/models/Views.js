const {Sequelize, sequelize} = require('../database/db');

const Views = sequelize.define('views', {
    count_views:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
}
);

module.exports = Views;