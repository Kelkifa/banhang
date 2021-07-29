const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require('mongoose-delete');

const users = new Schema(
    {
        fullname: { type: String, require },
        username: { type: String, require, unique: true },
        password: { type: String, require },
    },
    {
        timestamps: true
    }
);
users.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('users', users);