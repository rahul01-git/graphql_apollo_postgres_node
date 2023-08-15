"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../config/connection");
const book_1 = __importDefault(require("./book"));
const Author = connection_1.sequelize.define('Author', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    timestamps: true,
    paranoid: true,
});
Author.hasMany(book_1.default, {
    foreignKey: 'authorId',
    as: 'books',
});
book_1.default.belongsTo(Author, {
    foreignKey: 'authorId',
    as: 'author'
});
exports.default = Author;
