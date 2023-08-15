"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const author_1 = __importDefault(require("../models/author"));
const book_1 = __importDefault(require("../models/book"));
require("dotenv/config");
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
        // register: async (parent: any, { registerInput: { username, email, password, confirmPassword } }) => {
        //   password = await bcrypt.hash(password,12)
        //   const newUser = new User({
        //     email,
        //     username,
        //     password,
        //     createdAt: new Date().toISOString()
        //   }) 
        //   const res = await newUser.save()
        //   const token = jwt.sign({
        //     id: res.id,
        //     email: res.email,
        //     username: res.username
        //   },process.env.JWT_SECRET!,{expiresIn: '1h'})
        //   console.log(res)
        //   return {
        //     newUser,
        //     token,
        //     id:1
        //   }
        // },
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
