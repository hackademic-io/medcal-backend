import express, { Response, Request } from 'express'
import sendMessageToInitAppExc from '../models/init_app_exc_producer'

const actionAppRoutes = express.Router()

actionAppRoutes.post('/appointment', (req: Request, res: Response) => {
    const { email, id, first_name, last_name, open_to_earlier, date, time, booked } = req.body
    // const { msg, router_key } = req.body

    sendMessageToInitAppExc({ email, id, first_name, last_name, open_to_earlier, date, time, booked }).then(() => {
        res.status(200).send('Message successfully sent to the exchange')
    }).catch((error: Error) => {
        console.error('Failed to send message to RabbitMQ:', error);
        res.status(500).send('Failed to send message');
    })
})

export default actionAppRoutes