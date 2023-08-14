import { sequelize } from "../config/database";
import { DataTypes, Model } from 'sequelize'
class Book extends Model{
  static associate(models:any){
    Book.belongsTo(models.Author,{
      foreignKey: 'authorId',
      as: 'author'
    })
  }
}

Book.init({
  title: {
    type: DataTypes.STRING,
    allowNull:false
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{sequelize, modelName: "Book"})

export default Book