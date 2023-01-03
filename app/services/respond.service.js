module.exports = function respond({res, statusCode = 200, message = "Success", data = {}}){
    res.status(statusCode).send({statusCode, message, data});
}