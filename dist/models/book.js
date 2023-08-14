"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
class Book extends sequelize_1.Model {
    static associate(models) {
        Book.belongsTo(models.Author, {
            foreignKey: 'authorId',
            as: 'author'
        });
    }
}
Book.init({
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, { sequelize: database_1.sequelize, modelName: "Book" });
exports.default = Book;
