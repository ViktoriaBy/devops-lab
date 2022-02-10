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
    
    res.status(200).send(todos)
})


app.get('/api/todos/:id', (req, res) =>{
    const id = +req.params.id;

    if(id <0 || id >= todos.length){
        if(id < 0){
            rollbar.error(`Someone tried to get an index less than 0`)

        }else{
    rollbar.error(`Someone tried to get an inde above out of range`)
        }
        return res.sendStatus(400);
    }
    res.status(200).send(todos[id])
})


app.post('/api/todos', (req, res) => {
    const { toDoItem } = req.body
    todos.unshift(toDoItem) //put new name at beginning at array
rollbar.critical('Someone tried to add a todo!')
    res.status(200).send(todos)
})



app.delete('/api/todos/:id', (req, res) => {
    const targetIndex = +req.params.index
 rollbar.critical('Someone tried to delete a todo!')
    todos.splice(targetIndex, 1);

    rollbar.warning(`Someone deleted the  ${todos[+req.params.id]} todo`)
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