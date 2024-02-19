import express, { Express } from 'express'
import cors from 'cors'
import actionAppRoutes from './routes/action-app'
require('dotenv').config();

const app: Express = express()

const PORT = process.env.APPOINTMENT_INTERFACE_PORT && parseInt(process.env.APPOINTMENT_INTERFACE_PORT) || 3002

app.use(express.json())
app.use(cors({ origin: '*' }))

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`)
})

{/* receives the post request with the .body like: */ }
// {
//     msg: string
//     router_key: 'book' | 'cancel'
// }

app.use('/action', actionAppRoutes)