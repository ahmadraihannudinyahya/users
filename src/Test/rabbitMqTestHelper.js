const rabbitCon = require('../Infrastructure/MessageBroker/con');

const rabbitMqTestHelper = {
    consumerTestHelper: async () => {
        const queue = 'auth_users';
        const ch = await rabbitCon.createChannel();

        const res = await ch.get(queue,{
            noAck: true
        });
        return {
            routingKey: res.fields.routingKey, 
            data: JSON.parse(res.content.toString())
        };
    }, 
    purgeQueue: async () => {
        const queue = 'auth_users';
        const ch = await rabbitCon.createChannel();
        await ch.purgeQueue(queue)
    }
};

module.exports = rabbitMqTestHelper;