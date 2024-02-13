const express = require('express')
const cors = require('cors')
const initAppExcReceiver = require('./models/init_app_exc_receiver')
require('dotenv').config()

const app = express()

const PORT = parseInt(process.env.NOTIFICATION_SERVICE_PORT)

app.use(express.json())
app.use(cors({ origin: '*' }))

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})

initAppExcReceiver()

