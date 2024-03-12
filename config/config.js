import dotenv from 'dotenv'
dotenv.config()

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