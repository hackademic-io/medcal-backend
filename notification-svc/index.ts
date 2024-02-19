import express, { Express } from 'express'
import cors from 'cors'
import initAppExcReceiver from './models/init_app_exc_receiver'
require('dotenv').config()

const app: Express = express()

const PORT = process.env.NOTIFICATION_SERVICE_PORT && parseInt(process.env.NOTIFICATION_SERVICE_PORT) || 3001

app.use(express.json())
app.use(cors({ origin: '*' }))

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})

initAppExcReceiver()

