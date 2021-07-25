
const mongoose = require('mongoose');
const MONGOOSE_URL = "mongodb+srv://huan:Kelkifa123@cluster0.wohyo.mongodb.net/banhang?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(MONGOOSE_URL || 'mongodb://localhost/banhang', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect successfully');

    } catch (err) {
        console.log("Fail to connect to db: " + err)
    }
}

module.exports = { connect }
