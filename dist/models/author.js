"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
class Author extends sequelize_1.Model {
    static associate(models) {
        Author.hasMany(models.Book, {
            foreignKey: 'authorId',
            as: 'books'
        });
    }
}
Author.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, { sequelize: database_1.sequelize, modelName: "Author" });
exports.default = Author;
