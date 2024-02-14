import express, { Response, Request } from 'express'
const sendMessageToInitAppExc = require('../models/init_app_exc_producer')

const actionAppRoutes = express.Router()

actionAppRoutes.post('/appointment', (req: Request, res: Response) => {
    const { msg, router_key } = req.body

    sendMessageToInitAppExc({ msg, router_key }).then(() => {
        res.status(200).send('Message successfully sent to the exchange')
    }).catch((error: Error) => {
        console.error('Failed to send message to RabbitMQ:', error);
        res.status(500).send('Failed to send message');
    })
})

export default actionAppRoutes