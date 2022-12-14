const ClientError = require('../ClientError');

describe('ClientError Exceptions test', () => {
    it('should throw error when invoke abstract class', () => {
        expect(() => new ClientError('')).toThrowError('ClientError is abstract class')
    })
});