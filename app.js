const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth',require('./routs/auth.routs'))
app.use('/api/maps',require('./routs/maps.routs'))

const PORT = process.env.PORT || 5000

async function start()
{
    try
    {
        await mongoose.connect(process.env.MONGODB_URI || config.get("mongoUri"),
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true 
        })

        if(process.env.NODE_ENV === 'production')
        {
            app.use(express.static('client/build'))
        }

        app.listen(PORT,()=>
{
    console.log("Server has been started")
})
    }
    catch(e)
    {
        console.log(e)
        console.log("Отсутствует подключение к базе данных!!")
    }
}
start()
