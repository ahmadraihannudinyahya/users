const Validation = require('../Validation');

describe('Validation Applications test', () => {
    it('should throw error when invoke class without implementation', () => {
        const validation = new Validation();

        expect(() => validation.validate()).toThrowError('Validation_Applications_Is_Abstract_Class');
    });
});