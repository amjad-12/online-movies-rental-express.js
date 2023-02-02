function asyncMiddleware(handler) {
    return async (re,res,next) => {
        try {
            await handler(req,res);
        }
        catch(ex) {
            next(ex);
        }
    };
}

module.exports = asyncMiddleware;