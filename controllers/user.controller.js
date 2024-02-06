const { User } = require("../models");
const { comparePassword } = require("../helpers/argon");
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
        name: res.__('error.login_error'),
        message: res.__("error.user_email_not_found", {email: email}),
      });
    }

    const isCorrect = await comparePassword(user.password, password);

    if (!isCorrect) {
      return res.status(400).json({
        name: res.__('error.login_error'),
        message: res.__("error.user_email_not_found", {email: email}),
      });
    }

    const token = generateToken({ id: user.id, });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: res.__('error.internal_server_error') });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const result = await UserService.createUser(req.body, res);
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

    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode).json(error.message);
  }
};

exports.show = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw UserResource.error(`${res.__('error.user_not_found')}`);
    }

    const data = UserResource.resource(user);
    res.status(data.success.statusCode).json(data);
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
};

exports.destroy = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw UserResource.error(res.__('error.user_not_found'));
    }
    const data = await UserService.deleteUser(user, res);
    res.status(data.success.statusCode).json(data);
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
}

exports.update = async (req, res) => {
  try{
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw UserResource.error(res.__('error.user_not_found'));
    }
    const data = await UserService.updateUser(user, req.body, res);
    res.status(data.success.statusCode).json(data);
  } catch (error) {
    res.status(error.statusCode ?? 500).json(error);
  }
};