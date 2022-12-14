const ProducresRabbitMq = require('../ProducresRabbitMq');
const rabbitCon = require('../../MessageBroker/con');
const { consumerTestHelper, purgeQueue } = require('../../../Test/rabbitMqTestHelper');

describe('ProducresRabbitMq test', () => {
    beforeEach(async () => {
        await purgeQueue();
    });
    afterAll(async () => {
        await rabbitCon.closeCon();
    });
    describe('postUser method test', () => {
        it('should send message to message broker corectly', async () => {
            const user = {
                id: 'user-test', 
                username: 'userteset', 
                passwpord: 'encrypted'
            }

            const producresRabbitMq = new ProducresRabbitMq({rabbitCon});

            await producresRabbitMq.postUser(user);

            await new Promise((r) => setTimeout(r, 2000));

            const data = await consumerTestHelper();

            expect(data.routingKey).toEqual('users');
            expect(data.data.type).toEqual('CREATE');
            expect(data.data.data.id_user).toEqual(user.id);
            expect(data.data.data.username).toEqual(user.username);
            expect(data.data.data.passwpord).toEqual(user.passwpord);
        });
    });
});