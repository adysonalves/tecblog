const express = require('express');
const Categoria = require('../src/models/Categoria');
const Post = require('../src/models/Posts');
const Views = require('../src/models/Views');
const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await Post.count({
        where: {
            id_autor: req.session.userId
        }
    });
    const views = await Views.findByPk(1).then(views => views.count_views);
    const categorias = await Categoria.count()
    res.render('./painel/home', { title: 'Painel', css: 'painel', qntPosts: posts, qntViews: views, qntCategorias: categorias });
});

router.get('/posts', async (req, res) => {
    const posts = await Post.findAll(
        {
            where: {
                id_autor: req.session.userId
            }
        },
        {
            limit: 10
        }
    )

    res.render('./painel/listar-posts', { title: 'Todos os posts', css: 'painel', table: true, posts: posts.map(dados => dados.toJSON()) });
})

router.get('/nova-postagem', async (req, res) => {
    const categorias = await Categoria.findAll().then(dados => dados.map(categoria => categoria.toJSON()));

    res.render('./painel/novo-post', { title: 'Novo post', css: 'painel', categorias: categorias });
});

router.get('/categorias', async (req, res) => {
    res.render('./painel/categorias', {
        title: 'Categorias',
        css: 'painel'
    })
})

router.get('/logout', (req, res) => {
    req.session.logado = false;
    return res.redirect('/')
});


router.post('/novo-post', async (req, res) => {
    await Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        id_autor: req.session.userId,
        id_categoria: req.body.categoria
    }).then(() => {
        return res.redirect('/painel/posts')
    })
});

router.post('/nova-categoria', async (req, res) => {
    await Categoria.create(req.body).then(() => {
        return res.redirect('/painel')
    })
});

router.post('/del-post', async (req, res) => {
    await Post.destroy({
        where: {
            id: req.body.id
        }
    }).then(success => {
        return res.redirect('/painel/posts')
    })
});

router.post('/editar-post', async (req, res) => {
    const categorias = await Categoria.findAll().then(dados => dados.map(categoria => categoria.toJSON()));



    await Post.findByPk(req.body.id).then(async (dados) => {
        const categoriaAtual = await Categoria.findByPk(dados.id_categoria).then(categ => categ.descricao)

        return res.render('./painel/editar-post', { title: 'Editando post', css: 'painel', id: dados.id, titulo: dados.titulo, conteudo: dados.conteudo, categoria: dados.id_categoria, nomeCategoria: categoriaAtual, categorias: categorias });
    })
});

router.post('/update-post', async(req,res) => {
    await Post.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        id_autor: req.session.userId,
        id_categoria: req.body.categoria
    },{
        where:{
            id: req.body.id
        }
    }).then(success => {
        return res.redirect('/painel/posts')
    })
})


module.exports = router;