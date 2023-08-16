"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = exports.validateRegisterInput = void 0;
const regex_email_1 = require("../regex.email");
const validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = {};
    if (username.trim() === '')
        errors.username = 'Username must not be empty';
    if (email.trim() === '')
        errors.username = 'Email must not be empty';
    else {
        if (!email.match(regex_email_1.emailRegex))
            errors.email = 'Email must be a valid email address';
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty';
    }
    else if (password !== confirmPassword)
        errors.confirmPassword = 'Password and Confirm Password must match';
    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
};
exports.validateRegisterInput = validateRegisterInput;
const validateLoginInput = (email, password) => {
    const errors = {};
    if (email.trim() === '')
        errors.username = 'Email must not be empty';
    else {
        if (!email.match(regex_email_1.emailRegex))
            errors.email = 'Email must be a valid email address';
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
};
exports.validateLoginInput = validateLoginInput;
