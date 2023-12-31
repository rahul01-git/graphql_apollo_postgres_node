import { DataTypes } from 'sequelize'
import { sequelize } from '../config'
import { BookInstance } from '../interfaces'

const Book = sequelize.define<BookInstance>(
  'Book',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }
  , {
    timestamps: true,
    paranoid: true,
  }
)

export default Book

