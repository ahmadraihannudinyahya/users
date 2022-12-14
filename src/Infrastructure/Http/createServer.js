const express = require('express');
const ClientError = require('../../Commons/Exepctions/ClientError');
const api = require('../../Interface/Api/index');

const createServer = (container) => {
    const app = express();

    app.use(express.json());

    app.use('/users', api({express, container}));

    app.use((error, req, res, next) => {
        if(error instanceof ClientError){
            return res.status(error.statusCode).send({ status: 'fail', message: error.message });
        }
        return res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    });
    return app;
};

module.exports = createServer;