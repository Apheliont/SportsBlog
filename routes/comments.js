const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Article = require('../models/article');

router.post('/add/:id', async (req, res) => {
    try {
        const comment = await Comment.addComment(req.body);
        const article = await Article.getArticle(req.params.id);
        article.comments.push(comment);
        await article.save();
    } catch(e) {
        res.send(e);
    }

    res.redirect('/articles/show/' + req.params.id);
});

module.exports = router;