const router = require('express').Router()
const passport = require('passport')

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.json({
          success: true,
          cookies: req.cookies,
          user: req.user
        })
    }
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({success: false})
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(`http://localhost:${process.env.PORT}`)
})

router.get('/twitter', passport.authenticate('twitter'))

router.get(
    '/twitter/redirect',
    passport.authenticate('twitter', {
        successRedirect: `http://localhost:${process.env.PORT}`,
        failureRedirect: '/auth/login/failed'
    })
)

module.exports = router