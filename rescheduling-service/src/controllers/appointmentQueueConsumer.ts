import * as amqp from 'amqplib';

async function consumeAppointmentQueue() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'appointments';
    await channel.assertQueue(queue, { durable: false });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(' [x] Received %s', msg.content.toString());
        }
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error('Error consuming messages', error);
  }
}

consumeAppointmentQueue();
