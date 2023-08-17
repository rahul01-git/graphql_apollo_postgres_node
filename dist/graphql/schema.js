"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql

  type Author {
    id: ID!
    name: String!
    dob: String
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    authorId: ID!
    author: Author
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }

  type Query{
    authors: [Author!]!
    books: [Book!]!
  }

  input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
  }

  type Mutation {

    register(input: RegisterInput!) : User!
    login(email:String!, password: String!) : User!

    createAuthor(name: String!, dob: String): Author!
    updateAuthor(id:ID!, name:String!,age:Int) : Author!
    deleteAuthor(id:ID!) : Author !

    createBook(title: String!, authorId: ID!) : Book!
    updateBook(title: String!, id:ID!) : Book!
    deleteBook(id: ID!) : Book!
  }

`;
