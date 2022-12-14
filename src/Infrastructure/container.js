const { createContainer } = require('instances-container');

// 3rd party module
const bcrypt = require('bcrypt');
const ajv = require('ajv');

// conn
const rabbitCon = require('../Infrastructure/MessageBroker/con');
const { User, Payload } = require('../Infrastructure/Database/Models');

// implemented infras
const PayloadRepositoryMongoose = require('../Infrastructure/Repository/PayloadRepositoryMongoose');
const UsersRepositoryMongoose = require('../Infrastructure/Repository/UsersRepositoryMongoose');
const EncryptionsBcrypt = require('../Infrastructure/Security/EncryptionsBcrypt');
const ValidationAjv = require('../Infrastructure/Security/ValidationAjv');
const ProducresRabbitMq = require('../Infrastructure/Queue/ProducresRabbitMq');

// usecase
const AdduserUsecase = require('../Applications/Usecase/AdduserUsecase');

const container = createContainer();

container.register([
    {
        key: 'PayloadRepository',
        Class: PayloadRepositoryMongoose,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'Payload', 
                    concrete: Payload 
                },
            ],
        },
    }, 
    {
        key: 'UsersRepository',
        Class: UsersRepositoryMongoose,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'User', 
                    concrete: User 
                },
            ],
        },
    }, 
    {
        key: 'Encryptions',
        Class: EncryptionsBcrypt,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'bcrypt', 
                    concrete: bcrypt 
                },
            ],
        },
    }, 
    {
        key: 'Validation',
        Class: ValidationAjv,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'ajv', 
                    concrete: ajv 
                },
            ],
        },
    }, 
    {
        key: 'Producres',
        Class: ProducresRabbitMq,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'rabbitCon', 
                    concrete: rabbitCon 
                },
            ],
        },
    }
]);

container.register([
    {
        key: 'AdduserUsecase',
        Class: AdduserUsecase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'validation', 
                    internal: 'Validation' 
                },
                { 
                    name: 'encryptions', 
                    internal: 'Encryptions' 
                },
                { 
                    name: 'payloadRepository', 
                    internal: 'PayloadRepository' 
                },
                { 
                    name: 'usersRepository', 
                    internal: 'UsersRepository' 
                },
                { 
                    name: 'producers', 
                    internal: 'Producres' 
                },
            ],
        },
    },
]);

module.exports = container;