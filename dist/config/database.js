"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        username: "rahul_test",
        password: "rahul",
        database: 'graphQL',
        host: "127.0.0.1",
        port: 5432,
        dialect: 'postgres',
    },
    test: {
        username: "test",
        password: "test",
        database: 'sample_db',
        host: "test",
        port: "test",
        dialect: 'postgres',
    },
    production: {
        username: "test",
        password: "test",
        database: 'sample_db',
        host: "test",
        port: "test",
        dialect: 'postgres',
    },
};
exports.default = config;
