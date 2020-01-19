exports.get404 = (req, res, next) => {
    res.status(404).json({msg: 'Route does not exist'});
};

exports.errorHandler = (error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server Error';
    res.status(statusCode).json({message: message});
};