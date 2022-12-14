const con = require('../../Database/MongooseCon');
const { User } = require('../../Database/Models');
const InvariantError = require('../../../Commons/Exepctions/InvariantError')
const UsersRepositoryMongoose = require('../UsersRepositoryMongoose');
const { clearUserColections, getUserById, createUserTest } = require('../../../Test/UserTestHelper');

describe('UsersRepositoryMongoose test', () => {
    afterAll(async () => {
        await con.close();
    });
    afterEach(async () => {
        await clearUserColections();
    });
    describe('addUser method test', () => {
        it('should add user corectly', async () => {
            const payload = {
                username: 'encrypted', 
                email: 'test@mail.com', 
                password: 'encrypted', 
            }
            const usersRepositoryMongoose = new UsersRepositoryMongoose({User})

            const createdUser = await usersRepositoryMongoose.addUser(payload);

            const expectedUser = await getUserById(createdUser.id);
            
            expect(expectedUser).not.toBeFalsy();
            expect(createdUser.email).toEqual(payload.email);
            expect(createdUser.username).toEqual(payload.username);
            expect(createdUser.password).toEqual(payload.password);
        });
        it('should return added user corectly', async () => {
            const payload = {
                username: 'test', 
                email: 'test@mail.com', 
                password: 'encrypted', 
            }
            const usersRepositoryMongoose = new UsersRepositoryMongoose({User})

            const createdUser = await usersRepositoryMongoose.addUser(payload);

            expect(createdUser.email).toEqual(payload.email);
            expect(createdUser.username).toEqual(payload.username);
            expect(createdUser.password).toEqual(payload.password);
        });
    });
    describe('verifyUsernameAvailable method test', () => {
        it('should return resolve when username available', async () => {
            const username = 'testUser'
            const usersRepositoryMongoose = new UsersRepositoryMongoose({User});
            await expect(usersRepositoryMongoose.verifyUsernameAvailable(username)).resolves.not.toThrowError(InvariantError);
        });
        it('should return rejects when username not available', async () => {
            await createUserTest();
            const username = 'testUser'
            const usersRepositoryMongoose = new UsersRepositoryMongoose({User});
            await expect(usersRepositoryMongoose.verifyUsernameAvailable(username)).rejects.toThrowError(InvariantError);
        });
    });
    describe('verifyEmailAvailable method test', () => {
        it('should return resolve when email available', async () => {
            const email = 'test@mail.com'
            const usersRepositoryMongoose = new UsersRepositoryMongoose({User});
            await expect(usersRepositoryMongoose.verifyEmailAvailable(email)).resolves.not.toThrowError(InvariantError);
        });
        it('should return rejects when email not available', async () => {
            await createUserTest();
            const email = 'test@mail.com'
            const usersRepositoryMongoose = new UsersRepositoryMongoose({User});
            await expect(usersRepositoryMongoose.verifyEmailAvailable(email)).rejects.toThrowError(InvariantError);
        });
    });
});