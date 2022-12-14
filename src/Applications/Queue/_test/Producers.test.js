const Producers = require('../Producers');

describe('Producers Applications test', () => {
    it('should throw error when invoke class without implementation', () => {
        const producers = new Producers();

        expect(() => producers.postUser()).toThrowError('Producers_Applications_Is_Abstract_Class');
    });
});