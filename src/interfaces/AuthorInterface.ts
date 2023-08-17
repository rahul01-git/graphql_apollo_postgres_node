import { Model } from "sequelize"

export interface AuthorInstance extends Model {
    id: number
    name: string
    dob: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}