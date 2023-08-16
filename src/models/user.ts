import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connection';

export interface UserInstance extends Model{
    id: number;
    username: String;
    email: String;
    password: String;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

const User = sequelize.define<UserInstance>(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);


export default User


