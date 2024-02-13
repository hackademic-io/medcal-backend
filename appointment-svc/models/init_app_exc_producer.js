const amqp = require('amqplib/callback_api')
require('dotenv').config();

async function sendMessageToInitAppExc({ confirm_type, msg, router_key }) {
    amqp.connect(process.env.RABBITMQ_URL, function (error0, connection) {
        if (error0) {
            throw error0
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1
            }

            const exchange = process.env.EXCHANGE_NAME

            channel.assertExchange(exchange, 'direct', { durable: false })
            const new_msg = `Dear patient! Your ${msg} has been successfully ${confirm_type}ed!`
            channel.publish(exchange, router_key, Buffer.from(new_msg))

        })
        setTimeout(function () {
            connection.close();
        }, 500);
    })
}

module.exports = sendMessageToInitAppExc