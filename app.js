const express = require('express')
const app = express()

const dogsRouter = require('./controllers/dogs-router')
const catsRouter = require('./controllers/cats-router');

app.use(express.json())

app.use('/api/dogs', dogsRouter)
app.use('/api/cats', catsRouter)


module.exports = app