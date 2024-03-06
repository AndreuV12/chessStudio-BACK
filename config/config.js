import dotenv from 'dotenv'

if ( !process.env.ON_PRODUCTION ) dotenv.config({ path: 'config/.env' })
let {
    PORT,
    DB_USER, 
    DB_PASSWORD, 
    GOOGLE_CLIENT, 
    GOOGLE_SECRET,
    SERVER_URL,
    CLIENT_URL
} = process.env

export  {  
    PORT,
    DB_USER, 
    DB_PASSWORD, 
    GOOGLE_CLIENT, 
    GOOGLE_SECRET,
    SERVER_URL,
    CLIENT_URL
}