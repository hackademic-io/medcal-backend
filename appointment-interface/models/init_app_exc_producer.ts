import amqp from 'amqplib/callback_api'
require('dotenv').config();

async function sendMessageToInitAppExc({ email, id, first_name, last_name, open_to_earlier, date, time, booked }: { email: string, id: string, first_name: string, last_name: string, open_to_earlier: boolean, date: Date, time: Date, booked: boolean }) {

    const exchange_router_keys = ["book", "cancel"] as const
    const router_key = booked ? exchange_router_keys[0] : exchange_router_keys[1]
    const msg = `on ${date} at ${time}`

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
            exchange && channel.publish(exchange, router_key, Buffer.from(msg))

        })
        setTimeout(function () {
            connection.close();
        }, 500);
    })
}

export default sendMessageToInitAppExc