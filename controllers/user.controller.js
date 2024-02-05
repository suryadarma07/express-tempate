const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../middlewares/auth");
const UserService = require("../services/user.service")
const UserResource = require("../resources/user.resource");

exports.loginUser = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(400).json({
        name: "User Login Error",
        message: `User's with email "${email}" not found`,
      });
    }

    const isCorrect = comparePassword(password, user.password);

    if (!isCorrect) {
      return res.status(400).json({
        name: "User Login Error",
        message: `User's password with email "${email}" doesn't match`,
      });
    }

    const token = generateToken({ id: user.id, });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'internal server error' });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const result = await UserService.createUser(req.body);
    result.token = result.data?.id ? generateToken({ id: result.data.id }) : null;
    res.status(result.success.statusCode).json(result);
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
};

exports.index = async (req, res) => {
  try {
    const users = await User.findAll();
    const data = UserResource.items(users)

    return res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode).json(error.message);
  }
}

exports.show = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw UserResource.error('User Not Found');
    }

    const data = UserResource.resource(user);
    return res.status(data.success.statusCode).json(data);
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
}

exports.destroy = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw UserResource.error('User Not Found');
    }
    user.destroy();
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
}