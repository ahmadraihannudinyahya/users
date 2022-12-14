const ClientError = require("./ClientError");

class AuthenticationError extends ClientError{
    constructor(){
        super('Authentication Failed');
        this.name = 'AuthenticationError';
    }
}
module.exports = AuthenticationError;