"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
const dbConfig_1 = __importDefault(require("./dbConfig"));
const { username, password, database, host, dialect, port } = dbConfig_1.default.development;
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    port: +!port,
    dialect: dialect,
});
exports.sequelize = sequelize;
