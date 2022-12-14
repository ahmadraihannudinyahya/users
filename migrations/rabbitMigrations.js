require('dotenv').config();
const amqplib = require('amqplib');

(async () => {
  try {
    const queue = 'auth_users';
    const exchange = 'open_sso';

    const conn = await amqplib.connect(process.env.RABBIT_URL_TEST);
    console.log(`connected ${process.env.RABBIT_URL_TEST}`);

    const ch1 = await conn.createChannel();
    console.log(`channel created`);

    await ch1.assertExchange(exchange, 'direct');
    console.log(`exchange ${exchange} created`);


    await ch1.assertQueue(queue);
    console.log(`queue ${queue} created`);


    await ch1.bindQueue(queue, exchange, 'users');
    console.log(`bindings ${exchange} to  ${queue} with key users successfully`);

    await conn.close();
    console.log('migrations completed');
  } catch (error) {
    console.log('ERROR', error.message);
    throw error
  }
})();