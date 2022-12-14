class UsersRepository{
    addUser(payload){
        throw new Error('Users_Repository_Is_Abstract_Class') 
    }

    verifyUsernameAvailable(username, applicationId){
        throw new Error('Users_Repository_Is_Abstract_Class') 
    }

    verifyEmailAvailable(email, applicationId){
        throw new Error('Users_Repository_Is_Abstract_Class') 
    }
}

module.exports = UsersRepository;