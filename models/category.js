const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Введите заголовок']
    },
    description: String,
    numberOfArticles: {
        type: Number,
        default: 0
    }
});
// Хук по удалению всех записей определенной категории после удаления самой категории
CategorySchema.post('remove', async function(doc) {
    const Article = mongoose.model('article');
    try {
        await Article.remove({
            category: doc._id
        });
    } catch(e) {
        console.log(e);
    }
});

const Category = module.exports = mongoose.model('category', CategorySchema);

module.exports.getCategories = function () {
    return Category.find({}).sort([['title', 'ascending']]);
};

module.exports.addCategory = function (body) {
    const category = new Category({
        title: body.title,
        description: body.description
    });
    return category.save();
};

module.exports.updateCategory = function (id, body) {
    return Category.findOneAndUpdate({
            _id: id
        }, {
            title: body.title,
            description: body.description
        },
        {
            runValidators: true
        });
};

module.exports.removeCategory = async function(id) {
    try {
        const category = await Category.findById(id);
        await category.remove();
    } catch(e) {
        console.log(e);
        return e;
    }

};