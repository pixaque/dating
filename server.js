import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import cards from './dbCards.js'

//App Config
const app = express()
const port = process.env.PORT || 8001
const connection_url = ''

//Middleware
app.use(express.json())
app.use(Cors())
//DB Config

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
})

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/dating/cards', (req, res) => {
    const dbCard = req.body

    cards.create(dbCard)
    .then(() => {
        res.send({dbCard});
    })
    .catch((err) => {
        res.send({dbCard});
        console.error(err);
    });


})

app.get('/dating/cards', async (req, res) => {

    try {
        const post = await cards.find();
        
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }


})

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))
