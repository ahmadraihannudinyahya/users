const createRouter = ({express, handler}) => {
    const router = express.Router();
    router.post('/register', handler.registerUserHandler);
    return router;
}

module.exports = createRouter;