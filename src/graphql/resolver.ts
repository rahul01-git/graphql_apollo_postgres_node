import Author from "../models/author"
import Book from "../models/book"

export const resolvers = {
  Query: {
    authors: async () => await Author.findAll(),

    books: async () => await Book.findAll()
  },
  Author: {
    books: async (author: Author) => {
      const books = await Book.findAll({
        where: { authorId: (author as any).id }
      });
      return books;
    }
  },
  Book: {
    author: async (book: Book) => await Author.findByPk((book as any).authorId)
  },
  Mutation: {
    createAuthor: async (parent: any, args: any) => {
      const newAuthor = new Author(args)
      return await newAuthor.save()
    },
    updateAuthor: async (parent: any, args: any) => {
      const { id, name, age } = args
      await Author.update(
        { name, age }, { where: { id } }
      )
      const updatedAuthor = await Author.findByPk(id);
      if(!updatedAuthor) throw new Error(`No author with id: ${args.id}`)
      return updatedAuthor;
    },
    deleteAuthor: async (parent: any, args: any) => {
      const deletedAuthor = await Author.findByPk(args.id);
      if(!deletedAuthor) throw new Error(`No author with id: ${args.id}`)
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
    updateBook: async(parent: any, args: any)=>{
      const {id,title} = args
      await Book.update({title},{where: {id}})
      return await Book.findByPk(id)
    },
    deleteBook: async(parent: any, args:any)=>{
      const deletedBook = await Book.findByPk(args.id);
      if(!deletedBook) throw new Error(`No Book with id: ${args.id}`)
      await Book.destroy({
        where: {
          id: args.id
        }
      })
      return deletedBook
    }
  }
}

