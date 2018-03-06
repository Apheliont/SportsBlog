const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');
const Comment = require('./comment');

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Введите заголовок']
    },
    subtitle: String,
    author: {
        type: String,
        required: [true, 'Введите автора']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'Выберите категорию']
    },
    description: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    creationDate: {
        type: Date,
        default: Date.now
    }
});

// Хук по увеличению счетчика статей в определенной категории после добавления новой статьи
ArticleSchema.post('save', async function (doc) {
    const Category = mongoose.model('category');
    try {
        await Category.findByIdAndUpdate(doc.category, {
            $inc: {
                numberOfArticles: 1
            }
        });
    } catch (e) {
        console.log(e);
    }
});

// Хук по уменьшению счетчика статей в определенной категории после удаления новой статьи
ArticleSchema.post('remove', async function (doc) {
    const Category = mongoose.model('category');
    try {
        await Category.findByIdAndUpdate(doc.category, {
            $inc: {
                numberOfArticles: -1
            }
        });
    } catch (e) {
        console.log(e);
    }
});

const Article = module.exports = mongoose.model('article', ArticleSchema);

module.exports.addArticle = function (body) {
    const article = new Article({
        title: body.title,
        subtitle: body.subtitle,
        author: body.author,
        category: body.category,
        description: body.description
    });
    return article.save();
};

module.exports.updateArticle = function (id, body) {
    return Article.findOneAndUpdate({
            _id: id
        }, {
            title: body.title,
            subtitle: body.subtitle,
            author: body.author,
            category: body.category,
            description: body.description
        },
        {
            runValidators: true
        });
};

module.exports.getArticles = function () {
    return Article.find({}).populate('category', {
        title: 1,
        _id: 0
    });
};

module.exports.getCategoryArticles = function (id) {
    return Article.find({category: id}).populate('category', {
        title: 1,
        _id: 0
    });
};

module.exports.getArticle = function (id) {
    return Article.findOne({_id: id}).populate('comments');
};

module.exports.removeArticle = async function (id) {
    try {
        const article = await Article.findById(id);
        await article.remove();
    } catch (e) {
        console.log(e);
        return e;
    }
};