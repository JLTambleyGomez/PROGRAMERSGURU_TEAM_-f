const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Subscription",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
            type: {
                type: DataTypes.ENUM("mensual", "trimestral", "anual"), //
            },
            price: {
                type: DataTypes.INTEGER,
                // allowNull:false
             
            }, 
        },
        { timestamps: false, freezeTableName: true }
    );
};
