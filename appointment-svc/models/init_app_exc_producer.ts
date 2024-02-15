import amqp from 'amqplib/callback_api'
require('dotenv').config();

async function sendMessageToInitAppExc({ confirm_type, msg, router_key }: { confirm_type: string, msg: string, router_key: string }) {
    process.env.RABBITMQ_URL && amqp.connect(process.env.RABBITMQ_URL, function (error0, connection) {
        if (error0) {
            throw error0
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1
            }

            const exchange = process.env.EXCHANGE_NAME

            exchange && channel.assertExchange(exchange, 'direct', { durable: false })
            const new_msg = `Dear patient! Your ${msg} has been successfully ${confirm_type}ed!`
            exchange && channel.publish(exchange, router_key, Buffer.from(new_msg))

        })
        setTimeout(function () {
            connection.close();
        }, 500);
    })
}

export default sendMessageToInitAppExc