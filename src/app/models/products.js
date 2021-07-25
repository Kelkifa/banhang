const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require('mongoose-delete');

const products = new Schema(
    {
        name: { type: String },
        description: { type: String },
        cost: { type: Number },
        position: { type: String },
        img: [String],
        shapes: [String],
        colors: [String],
        shapeLinks: [String],
        colorLinks: [String]
    },
    {
        timestamps: true
    }
);
products.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('products', products);