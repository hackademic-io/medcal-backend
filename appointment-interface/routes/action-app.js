const express = require('express')
const sendMessageToInitAppExc = require('../models/init_app_exc_producer')

const actionAppRoutes = express.Router()

actionAppRoutes.post('/appointment', (req, res) => {
    const { msg, router_key } = req.body

    sendMessageToInitAppExc({ msg, router_key }).then(() => {
        res.status(200).send('Message successfully sent to the exchange')
    }).catch(error => {
        console.error('Failed to send message to RabbitMQ:', error);
        res.status(500).send('Failed to send message');
    })
})

module.exports = actionAppRoutes