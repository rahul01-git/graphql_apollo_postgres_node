import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { UserInstance } from '../interfaces';

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


