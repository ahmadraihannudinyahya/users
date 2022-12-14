class Handler{
    constructor({container}){
        this._container = container;

        this.registerUserHandler = this.registerUserHandler.bind(this);
    }
    async registerUserHandler(req, res, next){
        try {
            const payload = req.body;
            const adduserUsecase = this._container.getInstance('AdduserUsecase');
            const result = await adduserUsecase.execute(payload);
            res.status(201).send({
                status: 'success',
                data: result, 
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Handler;