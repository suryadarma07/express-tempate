const { User } = require('../models');
const UserResource = require("../resources/user.resource")


class UserService {
    static async createUser(body, res) {
        try {
            const createdUser = await User.create(body)
            return UserResource.resource(createdUser, res.__('success.user_created'), 201);
        } catch (e) {
            throw UserResource.error(e.errors[0].message)
        }
    };

    static async deleteUser(user, res) {
        try {
            await user.destroy();
            return {
                success: {
                    message : res.__('success.user_deleted'),
                    statusCode: 200,
                  },
            };
        } catch (e) {
            throw UserResource.error(e.errors[0].message)
        }
    };

    static async updateUser(user, body, res) {
        try {
            await user.update(body);
            return UserResource.resource(user, res.__('success.user_updated'), 200)
        } catch (e) {
            throw UserResource.error(e.errors[0].message)
        }
    };
}

module.exports = UserService;