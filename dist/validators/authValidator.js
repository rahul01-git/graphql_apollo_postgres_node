"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required().label('Email'),
    username: joi_1.default.string().alphanum().required().label("Username"),
    password: joi_1.default.string().required().min(4).max(12).label('Password'),
    confirmPassword: joi_1.default.string()
        .required()
        .valid(joi_1.default.ref('password'))
        .label('Confirm Password')
        .messages({
        'any.only': '{{#label}} does not match'
    })
}).options({ abortEarly: false });
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().email().required().label('Email'),
    password: joi_1.default.string().required().label('Password')
}).options({ abortEarly: false });
