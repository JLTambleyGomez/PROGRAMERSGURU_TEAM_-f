const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Comment", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: "Debe ingresar un mensaje que contenga hasta 50 caracteres",
          },
        },
      },
      commentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Debe ingresar una fecha",
          },
        },
      },
    },
    { timestamps: false, freezeTableName: true }
  );
}