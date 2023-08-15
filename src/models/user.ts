import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection';

const User = sequelize.define(
    'User', {
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
}, {
    timestamps: true,
    paranoid: true,
})

export default User