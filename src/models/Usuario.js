const {Sequelize, sequelize} = require('../database/db');

const Usuario = sequelize.define('usuario', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    passwd:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_user:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
}
);

module.exports = Usuario;