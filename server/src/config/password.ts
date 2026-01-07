export const JWT_SECRET = process.env.SECRET || "jwt_secret";   

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined ")
}