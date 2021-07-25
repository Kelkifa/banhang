const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require('mongoose-delete');

const orders = new Schema(
    {
        userId: { type: String },  //id cua nguoi dung da order
        productId: { type: String }, //id cua san pham,
        shape: { type: String }, //hinh dang cua san pham,
        color: { type: String }, //mau sac cua san pham,
        soLuong: { type: Number }, //so luong san pham
        diaChi: { type: Number }, //
        sdt: { type: String },
    },
    {
        timestamps: true
    }
);
orders.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('orders', orders);