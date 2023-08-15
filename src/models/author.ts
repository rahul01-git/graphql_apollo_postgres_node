import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection';
import Book from './book';

const Author = sequelize.define(
  'Author',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);


Author.hasMany(Book, {
  foreignKey: 'authorId',
  as: 'books',
});

Book.belongsTo(Author, {
  foreignKey: 'authorId',
  as: 'author'
})


export default Author;

export interface AuthorInstance {
  id: number
  name: string
  age: number | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}