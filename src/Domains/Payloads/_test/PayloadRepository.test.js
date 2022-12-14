const PayloadRepository = require('../PayloadRepository');

describe('PayloadRepository Domain test', () => {
    it('should throw error when invoke class without implementation', () => {
        const payloadRepository = new PayloadRepository();

        expect(() => payloadRepository.getPayloadById()).toThrowError('Payload_Repository_Is_Abstract_Class');
    });
});