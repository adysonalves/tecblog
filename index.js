require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
const PORT = process.env.PORT || 3000;

// HANDLEBARS
const hbs = require('express-handlebars');
app.engine('hbs', hbs.engine({
    defaultLayout: 'main',
    extname: 'hbs'
})); app.set('view engine', 'hbs');


// IMPORTA ROTA
const home = require('./routes/routesFront')

// BANCO DE DADOS
const {Sequelize, sequelize} = require('./src/database/db');

// MODELOS BD
const Post = require('./src/models/Posts')
const Categoria = require('./src/models/Categoria')


//MIDDLEWARES

// ROTAS
app.use('/', home);


// TRATA ERRO 404
app.use((req, res, next) => {
    res.status(404).render('404', {title: 'Página não encontrada!', css: 'estilo'})
})

app.listen(PORT, () => {
    console.log('Servidor rodando na porta 3000')
})