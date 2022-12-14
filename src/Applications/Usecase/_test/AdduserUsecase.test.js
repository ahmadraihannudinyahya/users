const AdduserUsecase = require('../AdduserUsecase');
const Encryptions = require('../../Security/Encryptions');
const Validation = require('../../Security/Validation');
const Producers = require('../../Queue/Producers');
const PayloadRepository = require('../../../Domains/Payloads/PayloadRepository');
const UsersRepository = require('../../../Domains/Users/UsersRepository');

describe('AdduserUsecase test', () => {
    it('should orchestrating add user usecase corectly',async () => {
        const payload = {
            email: 'test@mail.com', 
            password: '123456', 
            username: 'test'
        };

        const schema = {
            type: "object",
            schema: {
                properties: {
                    applicationId: {type: "string"},
                    email: {type: "string"},
                    password: {type: "string"}, 
                    username: {type: "string"}
                },
                required: ["email", "password", "username", "applicationId"], 
            }, 
        };

        const expectedEncryptedText = 'Encrypted';

        const expectedCreatedUser = {
            ...payload, 
            id: 'user-test123', 
            password: expectedEncryptedText, 
        };

        const mockEncryptions = new Encryptions();
        const mockValidation = new Validation();
        const mockProducers = new Producers();
        const mockPayloadRepository = new PayloadRepository();
        const mockUsersRepository = new UsersRepository();

        mockPayloadRepository.getPayloadById = jest.fn(() => {
            return Promise.resolve(schema);
        });
        mockValidation.validate = jest.fn(() => {
            return Promise.resolve();
        });
        mockUsersRepository.verifyEmailAvailable = jest.fn(() => {
            return Promise.resolve();
        });
        mockUsersRepository.verifyUsernameAvailable = jest.fn(() => {
            return Promise.resolve();
        });
        mockEncryptions.encrypt = jest.fn(() => {
            return Promise.resolve(expectedEncryptedText);
        });
        mockUsersRepository.addUser = jest.fn(() => {
            return Promise.resolve(expectedCreatedUser);
        });
        mockProducers.postUser = jest.fn(() => {
            return Promise.resolve();
        });

        const adduserUsecase = new AdduserUsecase({
            validation: mockValidation, 
            encryptions: mockEncryptions, 
            payloadRepository: mockPayloadRepository, 
            usersRepository: mockUsersRepository, 
            producers: mockProducers, 
        });

        await adduserUsecase.execute(payload);

        expect(mockPayloadRepository.getPayloadById).toBeCalledWith('testApp');
        expect(mockValidation.validate).toBeCalledWith(payload, schema.schema);
        expect(mockUsersRepository.verifyEmailAvailable).toBeCalledWith(payload.email, payload.applicationId);
        expect(mockUsersRepository.verifyUsernameAvailable).toBeCalledWith(payload.username, payload.applicationId);
        expect(mockEncryptions.encrypt).not.toBeCalledWith(payload.username);
        expect(mockEncryptions.encrypt).not.toBeCalledWith(payload.email);
        expect(mockEncryptions.encrypt).toBeCalledWith(payload.password);
        expect(mockUsersRepository.addUser).toBeCalledWith({
            ...payload, 
            password: expectedEncryptedText, 
        });
        expect(mockProducers.postUser).toBeCalledWith(expectedCreatedUser);
    });
})