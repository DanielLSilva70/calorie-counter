const express = require('express')
const cors = require('cors')
const path = require('path')
const {getCalories, getFood, setCalories, addFood, deleteFood, updatefood} = require('./controller')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('client'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})



app.get('/api/calories', getCalories)
app.get('/api/foods', getFood)
app.post('/api/calories', setCalories)
app.post('/api/foods', addFood)
app.delete('/api/foods/:id', deleteFood)
app.put('/api/foods/:id', updatefood)


const port = process.env.port || 5050

app.listen(port, () => console.log('Server running on 5050'))