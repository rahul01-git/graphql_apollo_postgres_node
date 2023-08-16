"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const author_1 = __importDefault(require("../models/author"));
const book_1 = __importDefault(require("../models/book"));
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const jwtSecret = process.env.JWT_SECRET;
exports.resolvers = {
    Query: {
        authors: async () => await author_1.default.findAll(),
        books: async () => await book_1.default.findAll()
    },
    Author: {
        books: async (author) => {
            const books = await book_1.default.findAll({
                where: { authorId: author.id }
            });
            return books;
        }
    },
    Book: {
        author: async (book) => await author_1.default.findByPk(book.authorId)
    },
    Mutation: {
        register: async (parents, args) => {
            const { username, email, password, confirmPassword } = args;
            if (password !== confirmPassword)
                throw new Error("Password and confirm password field doesn't match");
            try {
                const hashedPass = await bcryptjs_1.default.hash(password, 12);
                const newUser = await user_1.default.create({
                    email,
                    username,
                    password: hashedPass,
                });
                const token = jsonwebtoken_1.default.sign({
                    id: newUser.id,
                    email: newUser.email,
                    username: newUser.username,
                }, jwtSecret, { expiresIn: '1d' });
                return {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    createdAt: newUser.createdAt,
                    token
                };
            }
            catch (error) {
                console.error('Error registering user:', error);
                throw new Error('Could not register user');
            }
        },
        createAuthor: async (parent, args) => {
            const { name, age } = args;
            const newAuthor = await author_1.default.create({
                name,
                age
            });
            return await newAuthor.save();
        },
        updateAuthor: async (parent, args) => {
            const { id, name, age } = args;
            await author_1.default.update({ name, age }, { where: { id } });
            const updatedAuthor = await author_1.default.findByPk(id);
            if (!updatedAuthor)
                throw new Error(`No author with id: ${args.id}`);
            return updatedAuthor;
        },
        deleteAuthor: async (parent, args) => {
            const deletedAuthor = await author_1.default.findByPk(args.id);
            if (!deletedAuthor)
                throw new Error(`No author with id: ${args.id}`);
            await author_1.default.destroy({
                where: {
                    id: args.id
                }
            });
            await book_1.default.destroy({
                where: {
                    authorId: args.id
                }
            });
            return deletedAuthor;
        },
        createBook: async (parent, args) => {
            const { authorId, title } = args;
            const newBook = await book_1.default.create({
                authorId,
                title
            });
            return newBook;
        },
        updateBook: async (parent, args) => {
            const { id, title } = args;
            await book_1.default.update({ title }, { where: { id } });
            return await book_1.default.findByPk(id);
        },
        deleteBook: async (parent, args) => {
            const deletedBook = await book_1.default.findByPk(args.id);
            if (!deletedBook)
                throw new Error(`No Book with id: ${args.id}`);
            await book_1.default.destroy({
                where: {
                    id: args.id
                }
            });
            return deletedBook;
        }
    }
};
