const express = require('express');
const app = express()
const ssoRoutes = require('./routes/sso-routes')
const apiRoutes = require('./routes/api-routes')
const cookieSession = require('cookie-session')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cors = require('cors')
const port = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const Arena = require('bull-arena')
const { URL } = require('./crawler/scrape-queue')
const url = require('url')

mongoose.connect(keys.URI, () => console.log('db connected'))
app.use(cookieSession({name: 'user_session', keys: [keys.COOKIE_KEY], maxAge: 1000000}))

app.use(cookieParser())
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())
const corsOptions = {
    origin: `http://localhost:${port}`,
    credentials: true,
    methods: "GET,POST,PATCH,PUT,DELETE,HEAD"
}

app.use(cors(corsOptions))
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

// allow express to find the static build assets
app.use('/static', express.static(__dirname + '/static'))

// serve up the front-end
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('./index.ejs')
})


// the api 
app.use('/api', apiRoutes)

app.get('/backend', (req, res) => {
    res.send({express: 'backend connected'})
})

// queue dashboard

function getRedisConfig(redisUrl) {
    const redisConfig = url.parse(redisUrl);
    return {
      host: redisConfig.hostname || 'localhost',
      port: Number(redisConfig.port || 6379),
      database: (redisConfig.pathname || '/0').substr(1) || '0',
      password: redisConfig.auth ? redisConfig.auth.split(':')[1] : undefined
    };
}

app.use('/', Arena(
    {
        queues: [
            {
                name: URL,
                hostId: 'Worker',
                redis: getRedisConfig(process.env.REDIS_URL || '')
            }
        ],
    },
    {
        basePath: '/arena',
        disableListen: true
    }
))

app.listen(port, () => console.log('listening on port ' + port))
// todo: authentication callback for  backend endpoints


