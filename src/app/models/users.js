const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require('mongoose-delete');

const users = new Schema(
    {
        name: { type: String },
        email: { type: String, unique: true },
        picture: { type: String },
        userid: { type: String, unique: true },
        phoneNumber: { type: String, default: "" },
    },
    {
        timestamps: true
    }
);
users.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('users', users);