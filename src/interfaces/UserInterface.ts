import { Model } from "sequelize";

export interface UserInstance extends Model{
    id: number;
    username: String;
    email: String;
    password: String;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}