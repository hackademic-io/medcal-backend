const express = require('express')
const cors = require('cors')
const receiveMessageFromInitAppExc = require('./models/init_app_exc_receiver.js')
const appointmentActionEmitter = require('./utils/appointmentActionEmitter.js')
const sendMessageToInitAppExc = require('./models/init_app_exc_producer.js')
require('dotenv').config();

const app = express()

const PORT = parseInt(process.env.APPOINTMENT_SERVICE_PORT)

app.use(express.json())
app.use(cors({ origin: '*' }))

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})

receiveMessageFromInitAppExc()

appointmentActionEmitter.on('appointmentAction', message => sendMessageToInitAppExc(message))

