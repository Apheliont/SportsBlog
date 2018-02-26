const express = require('express');
const moment = require('moment');
const Category = require('../models/category');
const Article = require('../models/article');
const router = express.Router();

//------------------ ARTICLES ---------------------------
router.get('/articles', async (req, res) => {
    const articles = await Article.getArticles();
    res.render('./manage/articles/articles', {
        articles
    });
});

router.get('/articles/add', async (req, res) => {
    const categories = await Category.getCategories();
    res.render('./manage/articles/add', {
        categories
    });
});

router.post('/articles/add', async (req, res) => {
    try {
        await Article.addArticle(req.body);
        req.flash('success', 'Статья сохранена');
        res.redirect('/manage/articles');
    } catch (errors) {
        const categories = await Category.find({});
        res.render('./manage/articles/add', {
            categories,
            errors
        });
    }
});

router.delete('/articles/delete/:id', async (req, res) => {
    try {
        await Article.findOneAndRemove({_id: req.params.id});
        req.flash('success', 'Статья удалена');
        res.status(200).send('Article was successfully deleted');
    } catch (e) {
        res.send(e);
    }
});

router.get('/articles/edit/:id', (req, res) => {
    Promise.all([Article.findById(req.params.id).populate('category', {_id: 1}), Category.find({})])
        .then(data => {
            res.render('./manage/articles/edit', {
                article: data[0],
                categories: data[1]
            });
        })
        .catch(err => {
            res.send(err);
        });
});

router.post('/articles/edit/:id', async (req, res) => {
    try {
        await Article.updateArticle(req.params.id, req.body);
        req.flash('success', 'Статья обновлена');
        res.redirect('/manage/articles');
    } catch (errors) {
        const categories = await Category.find({});
        res.render('./manage/articles/edit', {
            article: {
                ...req.body,
                _id: req.params.id
            },
            categories,
            errors
        });
    }
});
// -------------------CATEGORIES -------------------------------

router.get('/categories', async (req, res) => {
    const categories = await Category.find({});
    res.render('./manage/categories/categories', {
        categories
    });
});


router.get('/categories/add', (req, res) => {
    // Category.getCategories((err, categories) => {
    //     if (err) {
    //         res.send(err);
    //     }
    res.render('./manage/categories/add');
    // });
});

router.post('/categories/add', async (req, res) => {
    try {
        await Category.addCategory(req.body);
        req.flash('success', 'Категория сохранена');
        res.redirect('/manage/categories');
    } catch (errors) {
        res.render('./manage/categories/add', {
            errors
        });
    }
});

router.delete('/categories/delete/:id', async (req, res) => {
    try {
        await Category.findOneAndRemove({_id: req.params.id});
        req.flash('success', 'Категория удалена');
        res.status(200).send('Category was successfully deleted');
    } catch (e) {
        res.send(e);
    }
});

router.get('/categories/edit/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.render('./manage/categories/edit', {
            category
        });
    } catch (e) {
        res.send(e);
    }
});

router.post('/categories/edit/:id', async (req, res) => {
    try {
        await Category.updateCategory(req.params.id, req.body);
        req.flash('success', 'Категория обновлена');
        res.redirect('/manage/categories');
    } catch (errors) {
        res.render('./manage/categories/edit', {
            category: {
                _id: req.params.id,
                ...req.body
            },
            errors
        });
    }
});

module.exports = router;