const ajv = require('ajv');
const ValidationAjv = require('../ValidationAjv');
const InvariantError = require('../../../Commons/Exepctions/InvariantError');


describe('ValidationAjv test', () => {
    describe('validate method test', () => {
        it('should not throw error when payload match with schmea', async () => {
            const schema = {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                    username: { type: 'string' }
                },
                required: [ 'email', 'password', 'username' ]
            }
            const payload = {
                email: 'test@mail.com', 
                password: 'superscret', 
                username: 'testuser'
            }
            const validationAjv = new ValidationAjv({ajv});

            await expect(validationAjv.validate(payload, schema)).resolves.not.toThrowError();
        });
        it('should throw error when payload not match with schmea', async () => {
            const schema = {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                    username: { type: 'string' }
                },
                required: [ 'email', 'password', 'username' ]
            }
            const payload = {
                email: 'test@mail.com', 
                password: 'superscret', 
                username: 123123
            }
            const validationAjv = new ValidationAjv({ajv});

            await expect(validationAjv.validate(payload, schema)).rejects.toThrowError(InvariantError);
        });
    });
});