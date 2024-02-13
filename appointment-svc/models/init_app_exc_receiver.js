const amqp = require('amqplib/callback_api')
const appActionEmitter = require('../utils/appointmentActionEmitter')
require('dotenv').config();

async function receiveMessageFromInitAppExc() {

    var router_keys = ['book', 'cancel'];

    amqp.connect(process.env.RABBITMQ_URL, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var exchange = process.env.EXCHANGE_NAME;

            channel.assertExchange(exchange, 'direct', { durable: false });

            channel.assertQueue('', {
                exclusive: true
            }, function (error2, q) {
                if (error2) {
                    throw error2;
                }
                console.log(' [*] Waiting for logs. To exit press CTRL+C');

                router_keys.forEach(function (router_key) {
                    channel.bindQueue(q.queue, exchange, router_key);
                });

                channel.consume(q.queue, function (msg) {
                    appActionEmitter.emit('appointmentAction', { confirm_type: msg.fields.routingKey, router_key: 'confirm', msg: msg.content.toString() })
                }, {
                    noAck: true
                });
            });
        });
    })
};

module.exports = receiveMessageFromInitAppExc