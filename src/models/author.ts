import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection';
import Book from './book';
import { AuthorInstance } from '../interfaces/AuthorInterface';



const Author = sequelize.define<AuthorInstance>(
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
    dob: {
      type: DataTypes.DATE,
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

