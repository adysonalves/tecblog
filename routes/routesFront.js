const express = require('express');
const Categoria = require('../src/models/Categoria');
const Post = require('../src/models/Posts');
const Usuario = require('../src/models/Usuario');
const Views = require('../src/models/Views');
const router = express.Router();


router.get('/', async(req,res) => {
    const posts = await Post.findAll({
        order:[
            ['createdAt', 'DESC']
        ]
    }).then(dados => dados.map(posts => posts.toJSON()));

    const postsRecentes = await Post.findAll({
        order:[
            ['createdAt', 'DESC']
        ]
    },
    {
        limit: 5
    }
    ).then(dados => dados.map(posts => posts.toJSON()));

    const categorias = await Categoria.findAll().then(dados => dados.map(categoria => categoria.toJSON()));

    if(req.session.logado){
        return res.status(200).render('homepage',{title: "Home", css: 'estilo', home: true, logado: req.session.logado, posts: posts, postsRecentes: postsRecentes, categorias: categorias});
    }

    // Quando o usuário acessa o blog, ele verifica se já existe o contador de views na tabela.
    await Views.findAll().then(async(views) => {
        // Se não existir, ele cria um registro com a primeira view.
        if(views.length == 0){
            await Views.create({
                count_views: 0
            })
        }
        // Caso já exista uma view contabilizada, ele faz o Update somando +1 visualização e renderiza a página.
        await Views.findByPk(1).then(async(view) => {
            await Views.increment({
                count_views: 1
            },
            {
                where:{
                    id:1
                }
            }
            )
            res.status(200).render('homepage',{title: "Home", css: 'estilo', home: true, logado: req.session.logado, posts: posts, postsRecentes: postsRecentes, categorias: categorias});
        })
        

    })
    
});

router.get('/post/:id', async(req,res) => {
    let id = req.params.id
    const post = await Post.findByPk(id);

    const postsRecentes = await Post.findAll({
        order:[
            ['createdAt', 'DESC']
        ]
    },
    {
        limit: 5
    }
    ).then(dados => dados.map(posts => posts.toJSON()));

    const categorias = await Categoria.findAll().then(dados => dados.map(categoria => categoria.toJSON()));


    res.status(200).render('post',{title: `${post.titulo}`, css: 'estilo', home: true, logado: req.session.logado, titulo: post.titulo, conteudo: post.conteudo,
    createdAt: post.createdAt, postsRecentes: postsRecentes, categorias: categorias});
    
})

router.get('/login', (req,res) => {
    if(req.session.logado){
        return res.redirect('/painel')
    }
    res.status(200).render('login',{title: 'Login', css: 'login', info: req.flash('info')});
});

router.post('/login', async(req,res) => {
    let email = req.body.email;
    let passwd = req.body.passwd;

    await Usuario.findOne({
        where:{
            email: email
        }
    }).then(dados => {
        if(dados != null && dados.passwd == passwd){
            req.session.logado = true;
            req.session.userId = dados.id;
            return res.redirect('/painel');
        }

        req.flash('info','Usuário ou senha inválidos!');
        return res.redirect('/login');
    }).catch(err => {
        console.log('Falha ao verificar usuário: '+err)
    })
})


module.exports = router;