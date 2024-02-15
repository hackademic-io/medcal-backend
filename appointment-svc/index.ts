import express, { Express } from 'express'
import cors from 'cors'
import receiveMessageFromInitAppExc from './models/init_app_exc_receiver'
import appointmentActionEmitter from './utils/appointmentActionEmitter'
import sendMessageToInitAppExc from './models/init_app_exc_producer'
require('dotenv').config();

const app: Express = express()

const PORT = process.env.APPOINTMENT_SERVICE_PORT && parseInt(process.env.APPOINTMENT_SERVICE_PORT) || 3000

app.use(express.json())
app.use(cors({ origin: '*' }))

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})

receiveMessageFromInitAppExc()

appointmentActionEmitter.on('appointmentAction', message => sendMessageToInitAppExc(message))

