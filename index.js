require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mySqlConnection = require('./config/mysql')
const userRoutes = require('./routes/test')
const port = process.env.PORT
const displayRoutes = require('express-routemap')


app.listen(port, () => {
    console.log(`i am listening on ${port}`)
    displayRoutes(app)
})


mySqlConnection.connect(err => {
    if (err) throw err.stack
    console.log('successfully connected: ' , mySqlConnection.threadId)
  })
 

app.use(bodyParser.json())
app.use(userRoutes)