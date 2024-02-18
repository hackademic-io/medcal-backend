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
//     email: data.email,
//     id: v4(),
//     first_name: data.first_name,
//     last_name: data.last_name,
//     open_to_earlier: data.open_to_earlier,
//     date,
//     time,
//     booked: true,
//   }

app.use('/action', actionAppRoutes)