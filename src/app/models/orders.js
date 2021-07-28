const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require('mongoose-delete');

const orders = new Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: 'products' }, //id cua san pham,
        shape: { type: String }, //hinh dang cua san pham,
        color: { type: String }, //mau sac cua san pham,
        soLuong: { type: Number }, //so luong san pham
        diaChi: {
            tinh_thanhPho: { type: String },
            quan_huyen: { type: String },
            xa_phuong: { type: String },
            detail: { type: String },
        },
        fullname: { type: String },
        sdt: { type: String },
    },
    {
        timestamps: true
    }
);
orders.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('orders', orders);