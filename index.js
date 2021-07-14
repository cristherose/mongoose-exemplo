const express = require('express')
const mongoose = require('mongoose')
const Task = require('./models/task')

const mongoUrl ='mongodb://localhost:27017/usuarios'
mongoose.connect(mongoUrl, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: true });
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express()
const port = 3000

app.get('/create ', async  (req, res) =>{
    const task = await Task.create ({ name: 'Comprar leite'});

    res.json({ task })
})

app.get('/read', async  (req, res) =>{
    const tasks = await Task.find ({});

    res.json({ tasks })
})
app.get('/read/:id', async  (req, res) =>{
    const task = await Task.findById(req.params.id)

    res.json({ task })
})
 
app.get ('/update/:id', async (req, res) =>{
    const task = await Task.findById(req.params.id)

    task.name = 'fazer ejercicio'
    task.status = true

    await task.save()

    res.send({ task})
})

app.get ('/delete/:id', async (req, res) =>{
    await Task.deleteOne({ _id: req.params.id}, () => {
        console.log('Deleted from Mongo!')
    })

    res.send('Deleted!')

})


app.listen(port, () =>{
    console.log(`Example app listening at http://localhost: ${port}`)
})