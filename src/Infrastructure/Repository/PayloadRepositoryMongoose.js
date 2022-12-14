const PayloadRepository = require("../../Domains/Payloads/PayloadRepository");

class PayloadRepositoryMongoose extends PayloadRepository{
    constructor({Payload}){
        super();
        this._payload = Payload;
    };

    async getPayloadById(id){
        const result = await this._payload.findOne({applicationId: id});
        return result
    }
}
module.exports = PayloadRepositoryMongoose;