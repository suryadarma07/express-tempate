const argon2 = require("argon2");

async function hashPassword(userPassword) {
    return await argon2.hash(userPassword);
}

async function comparePassword(hashedPassword, userPassword) {
    return await argon2.verify(hashedPassword, userPassword);
}

module.exports = {
    hashPassword,
    comparePassword
}