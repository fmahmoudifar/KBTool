const express = require('express');
const cors = require('cors')
const NameModel = require("./model/model")
const mongoose = require("mongoose")
const path = require("path")
const url = "mongodb+srv://fmahmoudifar:farshad4998@cluster0.zgzb5ab.mongodb.net/?retryWrites=true&w=majority"


const app = express()
app.use(express.json());
app.use(cors({credentials:true}))





mongoose.connect(url);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})



//--get all

app.get('/names', async (req, res) => {
    try {
        const newData = await NameModel.find({})

        res.status(200).send(newData)

    } catch (error) {
        console.log(error.message)

    }
})


//--add
app.post('/names', async (req, res) => {
    try {
        const newData = await new NameModel({
            name: req.body.name,
            level: req.body.level
        })
        await newData.save();


        res.status(200).json(newData)

    } catch (error) {
        console.log(error.message)

    }
})


// ----get one 

app.get('/names/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = await NameModel.findById(id)

        res.status(200).send(newData)

    } catch (error) {
        console.log(error.message)

    }
})


// ---- delete 

app.delete('/names/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = await NameModel.findByIdAndDelete(id)

        res.status(200).send(newData)

    } catch (error) {
        console.log(error.message)

    }
})

// ----update 
app.put('/names/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newData = await NameModel.findByIdAndUpdate(id, {
            name: req.body.name,
            family: req.body.family,
            level: req.body.level
        })

        res.status(200).send(newData)

    } catch (error) {
        console.log(error.message)

    }
})

// ----update 
// app.put('/names/filter', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const newData = await NameModel.findAndUpdate(id, {
//             name: req.body.name,
//             family: req.body.family,
//             level: req.body.level
//         })

//         res.status(200).send(newData)

//     } catch (error) {
//         console.log(error.message)

//     }
// })





app.listen(3001, ()=>{
    console.log("app is running")
})
