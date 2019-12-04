const express = require('express');
const app = express()
const ssoRoutes = require('./routes/sso-routes')
const cookieSession = require('cookie-session')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cors = require('cors')
const port = process.env.PORT || 5000
const cookieParser = require('cookie-parser')

mongoose.connect(keys.URI, () => console.log('db connected'))
app.use(cookieSession({name: 'user_session', keys: [keys.COOKIE_KEY], maxAge: 1000000}))

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
const corsOptions = {
    origin: "http://localhost:5000",
    credentials: true,
    methods: "GET,POST,PATCH,PUT,DELETE,HEAD"
}

// app.use(cors(corsOptions))
app.use('/auth', ssoRoutes)

const check = (req, res, next) => {
    if(!req.user) {
        res.status(400).json({
            authenticated: false
        })
    } else {
        next()
    }
}

app.use('/static', express.static(__dirname + '/static'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    // res.status(200).json({
    //     authenticated: true,
    //     user: req.user,
    //     cookies: req.cookies
    // })

    res.render('./index.ejs')
})


app.get('/backend', (req, res) => {
    res.send({express: 'backend connected'})
})

app.listen(port, () => console.log('listening on port ' + port))
// todo: authentication callback for  backend endpoints


