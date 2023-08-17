"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = joi_1.default.object().keys({
    email: joi_1.default.string().email().required().label('Email'),
    username: joi_1.default.string().alphanum().required().label("Username"),
    password: joi_1.default.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{4,12}$/).label('Password')
});
