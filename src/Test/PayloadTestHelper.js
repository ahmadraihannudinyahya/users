
const { Payload } = require('../Infrastructure/Database/Models');

const PayloadTestHelper = {
    generateTestPayload: async () => {
        const payload =  new Payload({
            applicationId: 'testApp', 
            schema: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                    username: { type: 'string' }
                },
                required: [ 'email', 'password', 'username' ]
            }
        })
        await payload.save()
    }, 
    clearPayloadColections: async () => {
        await Payload.deleteMany({});
    }, 
}

module.exports = PayloadTestHelper