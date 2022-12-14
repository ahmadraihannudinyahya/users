const con = require('../../Database/MongooseCon');
const { Payload } = require('../../Database/Models');
const PayloadRepositoryMongoose = require('../PayloadRepositoryMongoose');
const { generateTestPayload, clearPayloadColections } = require('../../../Test/PayloadTestHelper');

describe('PayloadRepositoryMongoose test', () => {
    beforeAll(async () => {
        await generateTestPayload();
    });
    afterAll(async () => {
        await clearPayloadColections();
        await con.close();
    });
    describe('getPayloadById method test', () => {
        it('should return payload schema sorectly', async () => {
            const payloadRepositoryMongoose = new PayloadRepositoryMongoose({Payload});

            const result = await payloadRepositoryMongoose.getPayloadById('testApp');
            expect(result).not.toBeFalsy();
            expect(result.schema).not.toBeFalsy();
        });
    });
});