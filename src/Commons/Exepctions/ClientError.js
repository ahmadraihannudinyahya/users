class ClientError extends Error{
    constructor(msg, statusCode = 400){
        super(msg);
        this.statusCode = statusCode;
        this.name = 'ClientError'
        if (this.constructor.name === 'ClientError') {
            throw new Error('ClientError is abstract class');
        }
    }
}

module.exports = ClientError;