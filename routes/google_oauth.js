import axios from 'axios'
import { google } from 'googleapis'
import { Router } from "express"
import { GOOGLE_CLIENT, GOOGLE_SECRET, SERVER_URL, CLIENT_URL } from '../../config/config.js'

//express
const google_router = Router()

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT,
    GOOGLE_SECRET,
    SERVER_URL+"oauth/google/callback"
)

//routes
google_router.get('/', function (req, res) {
    if (req.query.postman){
        // Simular login google
        req.session.user = {
            email: "andreuvillaro12@gmail.com",
            username: "Andreu"
        }
        res.send("Logged In with POSTMAN")
        return
    }

    let authurl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['email', 'profile'],
        include_granted_scopes: true
    })
    res.redirect(authurl)
})

google_router.get('/callback', async (req, res) => {
    const { tokens } = await oauth2Client.getToken(req.query.code)
    oauth2Client.setCredentials(tokens)

    //get user info
    let response = await axios({
        method: 'get',
        url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    })
    req.session.user = {
        email: response.data.email,
        username: response.data.given_name
    }
    // Crear o enontrar usuario
    res.redirect(CLIENT_URL)
})

google_router.get('/logout', function (req, res) {
    req.session.destroy()
    console.log(req.session);
    res.send("Loged Out")
})

export default google_router