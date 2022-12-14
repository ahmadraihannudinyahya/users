const { Schema } = require('mongoose');
const con = require('./MongooseCon');

const Schemas = {
    payloadSchema: new Schema({}, { strict: false }), 
    usersSchema: new Schema({}, { strict: false }), 
}

module.exports = {
    Payload: con.model('payloads', Schemas.payloadSchema),
    User: con.model('users', Schemas.payloadSchema),
}