"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Book = exports.Author = void 0;
var author_1 = require("./author");
Object.defineProperty(exports, "Author", { enumerable: true, get: function () { return __importDefault(author_1).default; } });
var book_1 = require("./book");
Object.defineProperty(exports, "Book", { enumerable: true, get: function () { return __importDefault(book_1).default; } });
var user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
