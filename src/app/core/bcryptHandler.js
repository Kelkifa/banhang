const bcrypt = require('bcrypt');
const saltRounds = 10;

const bcryptHandler = {
    hashPassword: async (plaintextPassword) => {
        try {
            const hash = await bcrypt.hash(plaintextPassword, saltRounds);
            return { success: true, hash };
        } catch (err) {
            console.log(err);
            return { success: false, err }
        }
    },
    comparePassword: async (plaintextPassword, hash) => {
        try {
            const compareStatus = await bcrypt.compare(plaintextPassword, hash);
            return { success: true, result: compareStatus };
        } catch (err) {
            return { success: false, result: err };
        }
    }
}

module.exports = bcryptHandler;