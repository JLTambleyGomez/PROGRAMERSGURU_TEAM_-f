const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "subscription",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                type: DataTypes.BOOLEAN,
            },
            subscriptionType: {
                type: DataTypes.ENUM("mensual", "trimestral", "anual"), // tipo de suscripcion: mensual, anual, etc
            },
        },
        { timestamps: false, freezeTableName: true }
    );
};
