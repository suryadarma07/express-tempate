const { User } = require('../models');
const UserResource = require("../resources/user.resource")


class UserService {
    static async createUser(body) {
        try {
            const createdUser = await User.create(body)
            return UserResource.resource(createdUser, "User Created", 201);
        } catch (e) {
            throw UserResource.error(e.errors[0].message)
        }
    }
}

module.exports = UserService;