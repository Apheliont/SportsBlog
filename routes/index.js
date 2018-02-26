const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/article');

router.get('/', async (req, res, next) => {
    const articles = await Article.find({}).limit(3).populate('category', {
        title: 1
    });
    res.render('index', {
        title: 'Home',
        articles
    });
    next();
});

module.exports = router;