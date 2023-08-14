"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = __importDefault(require("pg"));
require("dotenv/config");
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;
//creating sequelize Instance
exports.sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    dialectModule: pg_1.default
});
async function testConnection() {
    try {
        await exports.sequelize.authenticate();
        console.log(`The connection was successful with database: ${DB_NAME}`);
    }
    catch (err) {
        console.log(`Error: ${err}`);
    }
}
exports.testConnection = testConnection;
(async () => {
    console.log("testing connection");
    await testConnection();
    console.log("testing connection");
    try {
        await exports.sequelize.sync({
            match: new RegExp(`^${DB_NAME}$`)
        });
        console.log(`Table synchronization successful with the DB: ${DB_NAME}`);
    }
    catch (err) {
        console.log(`Error while synchronizing the database: ${DB_NAME}\nError: ${err}`);
    }
})();
