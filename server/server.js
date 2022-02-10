require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const path = require('path');



app.use(express.json())
app.use(cors())
app.use(express.static('public'))



const todos = ['Clean the house', 'Walk the dog', 'Eat some candy', 'Water the plants']

//ENDPOINT
app.get('/api/todos', (req, res) => {
    rollbar.info('Someone got all the students')
    res.status(200).send(todos)
})

app.post('/api/todos', (req, res) => {
    const { name } = req.body
    todos.unshift(name) //put new name at beginning at array

    res.status(200).send(todos)
})

app.delete('/api/todos/:id', (req, res) => {
    if (req.params.id === '0'){
        rollbar.error('Someone tried to delete the first student!')
        return res.status(403).send(todos)
    }

    rollbar.info(`Someone deleted student ${todos[+req.params.id]}`)

    todos.splice(+req.params.id, 1) //DELETES STUDENT ID FROM ARRAY

    

    res.status(200).send(todos)
})



const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

rollbar.log("Hello world!");

app.use(express.json())



const port = process.env.PORT || process.env.SERVER_PORT

app.listen(port, () => console.log(`Server running on ${port}`))