const { User } = require("../Infrastructure/Database/Models")

const UserTestHelper = {
    createUserTest: async () => {
        const user = new User({
            email: 'test@mail.com', 
            username: 'testUser', 
            password: 'encrypted', 
        });
        await user.save();
        return {
            ...user, 
            id: user._id.toString(), 
        };
    }, 
    getUserById: async (id) => {
        const user = await User.findById(id);
        return user;
    }, 
    clearUserColections: async () => {
        await User.deleteMany({});
    }, 
}

module.exports = UserTestHelper;