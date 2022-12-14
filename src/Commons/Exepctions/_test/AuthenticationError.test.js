const AuthenticationError = require('../AuthenticationError');

describe('AuthenticationError Exceptions test', () => {
    it('should create object AuthenticationError corectly', () => {
        const authenticationError = new AuthenticationError();

        expect(authenticationError.name).toEqual('AuthenticationError');
        expect(authenticationError.message).toEqual('Authentication Failed');
        expect(authenticationError.statusCode).toEqual(400);
    });
});