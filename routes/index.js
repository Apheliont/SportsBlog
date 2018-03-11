const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/article');

router.get('/page/:page', async (req, res) => {
    const articlesPerPage = 3;
    const pageNumber = +req.params.page;
    try {
        const data = await Promise.all([
            Article.find({})
                .count(),
            Article.find({})
                .skip(articlesPerPage * pageNumber)
                .limit(3)
                .populate('category', {
            title: 1
        })]);

        res.render('index', {
            title: 'Home',
            articles: data[1],
            articlesNumber: data[0],
            pageNumber
        });
    } catch (e) {
        res.send(e);
    }
});

router.get('/', (req, res) => {
    res.redirect("/page/0");
});

module.exports = router;