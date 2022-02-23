require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const displayRoutes = require('express-routemap')
const mySqlConnection = require('./config/mysql')
const stockRoutes = require('./routes/stock.routes')




const port = process.env.PORT

app.use(bodyParser.json())

app.listen(port, ()=>{
    console.log(`i am listening on ${port}`)
    displayRoutes(app)
})

mySqlConnection.connect(err =>{
    if (err) throw err.stack

    console.log('successfully connected: ', mySqlConnection.threadId)
})

app.use(morgan('combined'))
app.use(stockRoutes)



app.get('/', (req, res) =>{
    res.status(200).send({
        status: "error",
        message: "Lets get started"
    })
})

app.get((req, res, next) =>{
    res.status(404).send({
        status: "error",
        message: "what are you looking for?"
    })
})