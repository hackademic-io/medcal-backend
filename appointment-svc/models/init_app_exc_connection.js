const amqp = require('amqplib/callback_api')

async function sendMessageToInitAppExc({ msg, router_key }) {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1
            }

            const exchange = 'initial_appointment_exchange'

            channel.assertExchange(exchange, 'direct', { durable: false })
            channel.publish(exchange, router_key, Buffer.from(msg))

        })
        setTimeout(function () {
            connection.close();
            // process.exit(0)
        }, 500);
    })
}

module.exports = sendMessageToInitAppExc