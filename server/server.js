const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {

})

const port = process.env.port || 5050

app.listen(port, () => console.log('Server running on 5050'))