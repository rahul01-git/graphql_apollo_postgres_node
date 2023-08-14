
export const typeDefs = `#graphql

  type Author {
    id: ID!
    name: String!
    age: Int
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    authorId: ID!
    author: Author
  }

  type Query{
    authors: [Author!]!
    books: [Book!]!
  }

  type Mutation {
    createAuthor(name: String!, age: Int): Author!
    updateAuthor(id:ID!, name:String!,age:Int) : Author!
    deleteAuthor(id:ID!) : Author !

    createBook(title: String!, authorId: ID!) : Book!
    updateBook(title: String!, id:ID!) : Book!
    deleteBook(id: ID!) : Book!
  }

`;