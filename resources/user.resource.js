const { ErrorResponse } = require('../middlewares/error-handler');

class UserResource {
  static resource(user, message, statusCode = 200) {
    return {
      success: {
        message,
        statusCode
      },
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        phone_number: user.phone_number,
      }
    }
  }

  static items(users, statusCode = 200) {
    const data = users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        phone_number: user.phone_number,
      };
    });

    return {
      success: {
        statusCode,
      },
      data: data,
    };
  }

  static error(message, statusCode = 500) {
    throw ErrorResponse.error(message, statusCode);
  }
}

module.exports = UserResource;