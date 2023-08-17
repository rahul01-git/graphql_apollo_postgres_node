"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const Book = config_1.sequelize.define('Book', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    authorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true,
});
exports.default = Book;
