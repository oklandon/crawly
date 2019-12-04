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
    res.redirect('http://localhost:5000')
})

router.get('/twitter', passport.authenticate('twitter'))

router.get(
    '/twitter/redirect',
    passport.authenticate('twitter', {
        successRedirect: 'http://localhost:5000',
        failureRedirect: '/auth/login/failed'
    })
)

module.exports = router