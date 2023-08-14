import { sequelize } from '../config/database'
import { DataTypes, Model } from "sequelize";
class Author extends Model {
  static associate(models: any) {
    Author.hasMany(models.Book, {
      foreignKey: 'authorId',
      as: 'books'
    })
  }
}

Author.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER
  }
}, { sequelize, modelName: "Author" })

export default Author