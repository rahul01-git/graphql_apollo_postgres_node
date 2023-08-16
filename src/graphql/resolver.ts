import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import Author, { AuthorInstance } from "../models/author"
import Book, { BookInstance } from "../models/book"
import User, { UserInstance } from '../models/user'
import { validateRegisterInput, validateLoginInput } from '../utils/validators'
const jwtSecret = process.env.JWT_SECRET


export const resolvers = {
  Query: {
    authors: async () => await Author.findAll(),

    books: async () => await Book.findAll()
  },
  Author: {
    books: async (author: AuthorInstance) => {
      const books = await Book.findAll({
        where: { authorId: (author as any).id }
      });
      return books;
    }
  },
  Book: {
    author: async (book: BookInstance) => await Author.findByPk((book as any).authorId)
  },
  Mutation: {
    login: async (parent: any, args: any) => {
      const { email, password } = args
      const { valid, errors } = validateLoginInput(email, password)

      if (!valid) throw new Error(...Object.values(errors))

      const user = await User.findOne({ where: { email } })
      if (!user) throw new Error('User not Found')

      const matched = await bcrypt.compare(password,user.password.toString())
      if (!matched) throw new Error('Invalid email or password')

      const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,

      }, jwtSecret!, { expiresIn: '1d' })
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        token
      }
    },
    register: async (parents: any, args: any) => {
      const { username, email, password, confirmPassword } = args

      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)

      if (!valid) throw new Error(...Object.values(errors))

      const user = await User.findOne({ where: { email } })
      if (user) throw new Error(`email already used`)


      try {

        const hashedPass = await bcrypt.hash(password, 12)
        const newUser: UserInstance = await User.create({
          email,
          username,
          password: hashedPass,
        })


        const token = jwt.sign({
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,

        }, jwtSecret!, { expiresIn: '1d' })

        return {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.createdAt,
          token
        }
      } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Could not register user');
      }

    },
    createAuthor: async (parent: any, args: any) => {
      const { name, age } = args
      const newAuthor = await Author.create({
        name,
        age
      })
      return await newAuthor.save()
    },
    updateAuthor: async (parent: any, args: any) => {
      const { id, name, age } = args
      await Author.update(
        { name, age }, { where: { id } }
      )
      const updatedAuthor = await Author.findByPk(id);
      if (!updatedAuthor) throw new Error(`No author with id: ${args.id}`)
      return updatedAuthor;
    },
    deleteAuthor: async (parent: any, args: any) => {
      const deletedAuthor = await Author.findByPk(args.id);
      if (!deletedAuthor) throw new Error(`No author with id: ${args.id}`)
      await Author.destroy({
        where: {
          id: args.id
        }
      })

      await Book.destroy({
        where: {
          authorId: args.id
        }
      });

      return deletedAuthor

    },

    createBook: async (parent: any, args: any) => {
      const { authorId, title } = args

      const newBook = await Book.create({
        authorId,
        title
      })
      return newBook
    },
    updateBook: async (parent: any, args: any) => {
      const { id, title } = args
      await Book.update({ title }, { where: { id } })
      return await Book.findByPk(id)
    },
    deleteBook: async (parent: any, args: any) => {
      const deletedBook = await Book.findByPk(args.id);
      if (!deletedBook) throw new Error(`No Book with id: ${args.id}`)
      await Book.destroy({
        where: {
          id: args.id
        }
      })
      return deletedBook
    }
  }
}

