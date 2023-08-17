import { getJwtToken } from '../helpers/jwt.sign';
import bcrypt from 'bcryptjs'

import Author from "../models/author"
import Book from "../models/book"
import User from '../models/user'

import { AuthorInstance } from '../interfaces/AuthorInterface';
import { BookInstance } from '../interfaces/BookInterface';
import { UserInstance } from '../interfaces/UserInterface';

import { checkAuth } from '../helpers/checkAuth'
import { loginSchema, registerSchema } from '../validators/authValidator';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: "long",
    day: "numeric"
  })
}

export const resolvers = {
  Query: {
    authors: async (parent: any, args: any, context: any) => {
      checkAuth(context)

      const allAuthors = await Author.findAll()
      const formattedAuthors = allAuthors.map(author => ({
        ...author.toJSON(),
        dob: formatDate(author.dob)
      }))

      return formattedAuthors
    },

    books: async (parent: any, args: any, context: any) => {
      checkAuth(context)
      return await Book.findAll()
    },



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
    login: async (parent: any, args: { email: string, password: string }) => {
      const { email, password } = args
      
      const {error} = loginSchema.validate(args)
      if (error) {
        const loginErrors = error.details.map((detail) => detail.message)
        throw new Error(`Validation error: ${loginErrors.join(', ')}`)
      }

      const user = await User.findOne({ where: { email } })
      if (!user) throw new Error('User not Found')

      const matched = await bcrypt.compare(password, user.password.toString())
      if (!matched) throw new Error('Invalid email or password')

      const token = getJwtToken(user.id, user.email.toString(), user.username.toString())

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        token
      }
    },
    register: async (parents: any, args: any) => {
      const { username, email, password, confirmPassword } = args.input

      const { error } = registerSchema.validate(args.input)

      if (error) {
        const registerErrors = error.details.map((detail) => detail.message)
        throw new Error(`Validation error: ${registerErrors.join(', ')}`)
      }

      const user = await User.findOne({ where: { email } })
      if (user) throw new Error(`email already used`)


      try {

        const hashedPass = await bcrypt.hash(password, 12)
        const newUser: UserInstance = await User.create({
          email,
          username,
          password: hashedPass,
        })

        const token = getJwtToken(newUser.id, newUser.email.toString(), newUser.username.toString())

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
    createAuthor: async (parent: any, args: any, context: any) => {
      checkAuth(context)
      const { name, dob } = args
      const newAuthor = await Author.create({
        name,
        dob
      })
      return await newAuthor.save()
    },
    updateAuthor: async (parent: any, args: any, context: any) => {
      checkAuth(context)

      const { id, name, age } = args
      await Author.update(
        { name, age }, { where: { id } }
      )
      const updatedAuthor = await Author.findByPk(id);
      if (!updatedAuthor) throw new Error(`No author with id: ${args.id}`)
      return updatedAuthor;
    },
    deleteAuthor: async (parent: any, args: any, context: any) => {
      checkAuth(context)

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

    createBook: async (parent: any, args: any, context: any) => {
      checkAuth(context)
      const { authorId, title } = args
      const newBook = await Book.create({
        authorId,
        title
      })
      return newBook
    },
    updateBook: async (parent: any, args: any, context: any) => {
      checkAuth(context)
      const { id, title } = args
      await Book.update({ title }, { where: { id } })
      return await Book.findByPk(id)
    },
    deleteBook: async (parent: any, args: any, context: any) => {
      checkAuth(context)
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

