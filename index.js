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

//MIDDLEWARES

// ROTAS
app.use('/', home);

app.listen(PORT, () => {
    console.log('Servidor rodando na porta 3000')
})