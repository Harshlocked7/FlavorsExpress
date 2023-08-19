const express = require('express')
const mongoose = require('mongoose')
// const morgan = require('morgan')
const bodyParser = require('body-parser')

const userRoute = require('./routes/userRoute')

mongoose.connect('mongodb://localhost:27017/flaovorsexpress', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database connection established')
})

const app = express()

// app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json())
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();
})
//const PORT = process.env.PORT || 3000
const PORT =  5000

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/user', userRoute)