const EncryptionsBcrypt = require('../EncryptionsBcrypt');
const bcrypt = require('bcrypt')

describe('EncryptionsBcrypt test', () => {
    describe('encrypt method test', () => {
        it('should return encrypted text corectly',async () => {
            const password = 'superSecretPass';
            const encryptionsBcrypt = new EncryptionsBcrypt({bcrypt});
            const hashed = await encryptionsBcrypt.encrypt(password);

            expect(hashed).not.toEqual(password);
        });
    }); 
});