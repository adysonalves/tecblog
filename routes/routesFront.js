const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    res.status(200).render('homepage',{title: "Home", css: 'estilo'});
})


module.exports = router;