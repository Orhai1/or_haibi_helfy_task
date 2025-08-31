export function notFound(req,res, next){
    res.status(404).json({error: {message:"route not found"}});
}


export function errorHandler (err, req, res, next){
    const status= err.status;
    const message = err.message;
    res.status(status).json({error:{message}});
}