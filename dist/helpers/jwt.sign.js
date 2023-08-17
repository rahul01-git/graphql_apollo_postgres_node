"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const jwtSecret = process.env.JWT_SECRET;
const getJwtToken = (id, email, username) => jsonwebtoken_1.default.sign({
    id, email, username
}, jwtSecret, { expiresIn: '1d' });
exports.getJwtToken = getJwtToken;
