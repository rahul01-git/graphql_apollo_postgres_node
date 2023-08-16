import jwt from 'jsonwebtoken'
import 'dotenv/config'
const jwtSecret = process.env.JWT_SECRET


export const getJwtToken = (id: number, email: string, username: string) =>
    jwt.sign({
        id, email, username
    }, jwtSecret!, { expiresIn: '1d' })
