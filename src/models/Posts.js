const {Sequelize, sequelize} = require('../database/db');

const Post = sequelize.define('post', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    conteudo:{
        type: Sequelize.TEXT
    },
    thumb:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Post;