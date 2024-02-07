
const amqp = require('amqplib/callback_api')

var router_keys = ['book'];


amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'initial_appointment_exchange';

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
                console.log(`email sent with the message: ${msg}`);
            }, {
                noAck: true
            });
        });
    });
});