const {Sequelize, sequelize} = require('../database/db');
const Categoria = require('./Categoria');
const Usuario = require('./Usuario');

const Post = sequelize.define('post', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    conteudo:{
        type: Sequelize.TEXT
    }
});

Post.belongsTo(Usuario, {
    constraints: true,
    foreignKey:{
        name: 'id_autor',
        allowNull: false
    }
});

Post.belongsTo(Categoria, {
    constraints: true,
    foreignKey:{
        name: 'id_categoria',
        allowNull: false
    }
});

module.exports = Post;