import 'dotenv/config'
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

export const checkAuth = (context:any) => {
    const authHeader = context.req.headers.authorization
    if(authHeader){
        const token = authHeader.split('Bearer ')[1]
        if(token){
            try {
                const user = jwt.verify(token,JWT_SECRET)
                return user
            } catch (error) {
                throw new Error('Invalid/Expired token')
            }
        }
        throw new Error('Authorization token must be "Bearer [token]"')
    }
    throw new Error('Authorization header must be provided')
}