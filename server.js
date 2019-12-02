const express = require('express');
const app = express()

const port = process.env.PORT || 5000

app.set('view engine', 'ejs')

app.listen(port, () => console.log('listening on port ' + port))

app.use('/static', express.static(__dirname + '/static'))

app.get('/', (req, res) => {
    res.render('./index.ejs')
})


app.get('/backend', (req, res) => {
    res.send({express: 'backend connected'})
})
