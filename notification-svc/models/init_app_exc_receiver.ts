import amqp from 'amqplib/callback_api'
import sendEmail from './sendEmail'
require('dotenv').config()

async function receiveMessageFromInitAppExc() {

    var router_keys = ['confirm'];

    process.env.RABBITMQ_URL && amqp.connect(process.env.RABBITMQ_URL, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var exchange = process.env.EXCHANGE_NAME;

            exchange && channel.assertExchange(exchange, 'direct', { durable: false });

            channel.assertQueue('', {
                exclusive: true
            }, function (error2, q) {
                if (error2) {
                    throw error2;
                }
                console.log(' [*] Waiting for logs. To exit press CTRL+C');

                router_keys.forEach(function (router_key) {
                    exchange && channel.bindQueue(q.queue, exchange, router_key);
                });

                channel.consume(q.queue, function (msg) {
                    msg && sendEmail(msg.content.toString())
                }, {
                    noAck: true
                });
            });
        });
    })
};

export default receiveMessageFromInitAppExc