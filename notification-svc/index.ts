import express, { Express } from 'express'
import cors from 'cors'
import reschedulingPromptRoutes from './routes/rescheduling-prompt'
import confirmationJob from './models/confirmationJob'
import crypto from 'crypto';

// Generate a 256-bit (32-byte) secret key for AES-256 encryption
const secretKey = crypto.randomBytes(32);
// Generate a 128-bit (16-byte) IV for AES

console.log('Secret Key:', secretKey.toString('hex'));

require('dotenv').config()

const app: Express = express()

const PORT = process.env.NOTIFICATION_SERVICE_PORT && parseInt(process.env.NOTIFICATION_SERVICE_PORT) || 3001

app.use(express.json())
app.use(cors({ origin: '*' }))

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})

confirmationJob()

app.use('/notification', reschedulingPromptRoutes)
