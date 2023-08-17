import { Model } from "sequelize"

export interface BookInstance  extends Model{
    id: number
    title: string
    authorId: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}