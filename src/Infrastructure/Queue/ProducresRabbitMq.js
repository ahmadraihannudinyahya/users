const Producers = require("../../Applications/Queue/Producers");

class ProducresRabbitMq extends Producers{
    constructor({rabbitCon}){
        super();
        this._rabbitCon = rabbitCon;
        this._exchange = 'open_sso'
    }
    async postUser(user){
        const payload = {
            type: 'CREATE',
            data: {
                id_user: user.id, 
                email: user.email, 
                password: user.password, 
                ...user, 
            }
        };
        const channel = await this._rabbitCon.createChannel();
        channel.publish(this._exchange, 'users', Buffer.from(JSON.stringify(payload)));
        await channel.close();
    }
}
module.exports = ProducresRabbitMq;