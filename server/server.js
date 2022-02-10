require('dotenv').config()
const express = require('express')
const app = express()

const path = require('path');



app.use(express.json())
app.use(cors())
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html')) //path.join joins heroku path(__dirname) with ours
})




const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})



app.use(express.json())



const port = process.env.PORT || process.env.SERVER_PORT

app.listen(port, () => console.log(`Server running on ${port}`))