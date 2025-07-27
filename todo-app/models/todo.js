"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      Todo.belongsTo(_models.User, {
        foreignKey: "userId",
      });
      // define association here
    }
    static addTodo({ title, dueDate, userId }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
        userId,
      });
    }

    static getTodos(userId) {
      return this.findAll({
        where: {
          userId: userId,
        },
      });
    }

    static async remove(id, userId) {
      return this.destroy({
        where: {
          id: id,
          userId: userId,
        },
      });
    }

    setCompletionStatus(completed, userId) {
      return this.update(
        { completed: completed },
        { where: { userId: userId } }
      );
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: {
            args: [5],
            msg: "Todo must be at least 5 characters long",
          },
        },
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: { msg: "dueDate cannot be null" },
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
