const express = require('express')
const cors = require('cors')
const actionAppRoutes = require('./routes/action-app')
require('dotenv').config();

const app = express()

const PORT = parseInt(process.env.APPOINTMENT_INTERFACE_PORT)

app.use(express.json())
app.use(cors({ origin: '*' }))

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})

// receives the post request with the .body like:
// {
//     msg: string
//     router_key: 'book' | 'cancel'
// }

app.use('/action', actionAppRoutes)