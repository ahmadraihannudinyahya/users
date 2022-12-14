require('dotenv').config();

const http = require('http');
const createServer = require('./Infrastructure/Http/createServer');
const container = require('./Infrastructure/container');

(() => {
    const port = process.env.PORT;
    const app = createServer(container);
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log('server run in port ' + port)
    });
})();