const UsersRepository = require("../../Domains/Users/UsersRepository");
const InvariantError = require('../../Commons/Exepctions/InvariantError')

class UsersRepositoryMongoose extends UsersRepository{
    constructor({User}){
        super();
        this._user = User;
    }
    async addUser(payload){
        const user = new this._user(payload);
        await user.save();
        return {
            ...user, 
            id: user._id.toString(), 
        };
    }
    async verifyUsernameAvailable(username){
        const user = await this._user.findOne({
            username: username
        });
        if(user){
            throw new InvariantError('Username unavailable');
        }
    }
    async verifyEmailAvailable(email) {
        const user = await this._user.findOne({
            email: email
        });
        if(user){
            throw new InvariantError('Email unavailable');
        }
    }

}
module.exports = UsersRepositoryMongoose;