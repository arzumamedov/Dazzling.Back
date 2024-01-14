import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'

const app = express()
const port = 3030

app.use(express.json())
app.use(cors())

const CardSchema = new mongoose.Schema({
    name: String,
    title: String,
    img: String,

}, { timestamps: true });

const Card = mongoose.model('Cards', CardSchema);

app.get('/', async (req, res) => {
    try {
        const cards = await Card.find({})
        res.send(cards)
    } catch (error) {
        res.send(error.message)
    }
})
app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const cards = await Card.findById(id)
        res.send(cards)
    } catch (error) {
        res.send(error.message)
    }
})

app.post('/', async (req, res) => {
    try {
        const { name, title, img, timestamps } = req.body
        const newCard = new Card({ name, title, img, timestamps })
        await newCard.save()
        res.send('Post yaradildi')
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/:id', (req, res) => {

})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const cards = await Card.findByIdAndDelete(id)
        res.send(cards)
    } catch (error) {
        res.send(error.message)
    }
})


mongoose.connect('mongodb+srv://arzu:arzu@cluster0.9p2kmwb.mongodb.net/')
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})