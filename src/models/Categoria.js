const {Sequelize, sequelize} = require('../database/db');

const Categoria = sequelize.define('categoria',{
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    timestamps: false
}
);

module.exports = Categoria;