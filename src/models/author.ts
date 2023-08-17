import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
import Book from './book';
import { AuthorInstance } from '../interfaces';



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
    age: {
      type: DataTypes.INTEGER,
    },
    // dob: {
    //   type: DataTypes.DATE,
    // },
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

