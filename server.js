const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//Set body parser for HTTP post operation
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

const fakultas = require('./route/fakultas')
const jurusan = require('./route/jurusan')

app.use(fakultas)
app.use(jurusan)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(8888, () => {
    console.log('server running on port 8888')
})