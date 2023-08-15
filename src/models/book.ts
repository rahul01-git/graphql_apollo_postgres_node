import { DataTypes } from 'sequelize'
import { sequelize } from '../config/connection'
import Author from './author'

const Book = sequelize.define(
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

export interface BookInstance{
  id: number
  title: string
  authorId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}