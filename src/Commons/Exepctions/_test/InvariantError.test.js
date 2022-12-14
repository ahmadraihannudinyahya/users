const InvariantError = require('../InvariantError');

describe('InvariantError Exceptions test', () => {
    it('should create object InvariantError corectly', () => {
        const invariantError = new InvariantError('test');

        expect(invariantError.name).toEqual('InvariantError');
        expect(invariantError.message).toEqual('test');
        expect(invariantError.statusCode).toEqual(400);
    });
});