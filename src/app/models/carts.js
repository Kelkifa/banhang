const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const carts = new Schema(
    {
        userId: { type: String },   //id cua nguoi dung
        productId: { type: Schema.Types.ObjectId, ref: 'products' },
        soLuong: { type: Number, default: 0 },
        color: { type: String },
        shape: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('carts', carts);