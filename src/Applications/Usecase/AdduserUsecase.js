class AdduserUsecase{
    constructor({ validation, encryptions, payloadRepository, usersRepository, producers }){
        this._validation = validation;
        this._encryptions = encryptions;
        this._payloadRepository = payloadRepository;
        this._usersRepository = usersRepository;
        this._producers = producers;
    }
    async execute(payload){
        const schema = await this._payloadRepository.getPayloadById('testApp');
        await this._validation.validate(payload, schema.schema);
        await Promise.all([
            this._usersRepository.verifyEmailAvailable(payload.email, payload.applicationId), 
            this._usersRepository.verifyUsernameAvailable(payload.username, payload.applicationId), 
        ]);
        const encryptedPassword = await this._encryptions.encrypt(payload.password);
        const user = await this._usersRepository.addUser({
            ...payload, 
            password: encryptedPassword, 
        });
        await this._producers.postUser(user);
    }
}

module.exports = AdduserUsecase;