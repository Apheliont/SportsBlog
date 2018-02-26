const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required!']
    },
    description: String
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