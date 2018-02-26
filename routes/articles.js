const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const Category = require('../models/category');
const Comment = require('../models/comment');

router.get('/', async (req, res) => {
    const articles = await Article.getArticles();
    res.render('articles', {
        title: 'Статьи',
        articles
    });
});

router.get('/show/:id', async (req, res) => {
    const article = await Article.getArticle(req.params.id);
    res.render('article', {
        title: article.title,
        article
    });
});

router.get('/category/:id', async (req, res) => {
    const articles = await Article.getCategoryArticles(req.params.id);
    let title = 'Статьи не найдены';
    if (articles[0]) {
        title = articles[0].category.title;
    }
    res.render('articles', {
        title,
        articles
    });
});

module.exports = router;