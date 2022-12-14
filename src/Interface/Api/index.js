const Handler = require('./Handler.js');
const createRouter = require('./createRouter.js');

module.exports = ({express, container}) => {
    const handler = new Handler({container});
    return createRouter({express, handler})
}