const Encryptions = require("../../Applications/Security/Encryptions");

class EncryptionsBcrypt extends Encryptions{
    constructor({bcrypt}){
        super();
        this._bcrypt = bcrypt;
        this._rounds = 12;
    }
    async encrypt(text){
        const hashed = await this._bcrypt.hash(text, this._rounds);
        return hashed;
    }
};

module.exports = EncryptionsBcrypt;