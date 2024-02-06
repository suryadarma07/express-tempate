"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/argon")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // example
      // User.hasMany(models.Post, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        set(value) {
          this.setDataValue('email', value.toLowerCase());
        }
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(value) {
          this.setDataValue('username', value.toLowerCase());
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Must Be A Valid Integer",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      updatedAt: 'updated_at',
      createdAt: 'created_at',
      hooks: {
        beforeCreate: async (user) => {
          user.password = await hashPassword(user.password);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await hashPassword(user.password);
          }
        },
      },
    }
  );
  return User;
};
