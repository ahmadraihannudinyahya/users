const request = require('supertest');
const createServer = require('../createServer');
const container = require('../../container');
const rabbitCon = require('../../MessageBroker/con');
const mongooseCon = require('../../Database/MongooseCon');
const { generateTestPayload, clearPayloadColections } = require('../../../Test/PayloadTestHelper');
const {  purgeQueue } = require('../../../Test/rabbitMqTestHelper');


describe('ServerExpress Http test', () => {
    beforeEach(async () => {
        await generateTestPayload();
        await purgeQueue();
    });
    afterEach(async () => {
        await clearPayloadColections();
    });
    afterAll(async () => {
        await rabbitCon.closeCon();
        await mongooseCon.close();
    });
    describe('Post /register test', () => {
        it('should save data corectly', async () => {
            const payload = {
                username: 'testapp', 
                password: 'superSecret', 
                email: 'test@mial.com'

            };
            const app = createServer(container);
            const response = await request(app).post('/users/register').send(payload);
            expect(response.statusCode).toEqual(201);
        });
        it('should response 400 when payload not match schema', async () => {
            const payload = {
                username: 3648753687, 
                password: 'superSecret', 
                email: 'test@mial.com'

            };
            const app = createServer(container);
            const response = await request(app).post('/users/register').send(payload);
            expect(response.statusCode).toEqual(400);
        });
    });
});