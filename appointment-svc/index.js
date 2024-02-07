const express = require('express')
const cors = require('cors')
const bookAppRoutes = require('./routes/bookApp')

const app = express()

const PORT = 3000

app.use(express.json())
app.use(cors({ origin: '*' }))

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})

app.use('/book', bookAppRoutes)