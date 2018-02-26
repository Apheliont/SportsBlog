const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.getCategories();
        res.render('categories', {
            title: 'Категории',
            categories
        });
    } catch(e) {
        res.send(e);
    }


});

module.exports = router;