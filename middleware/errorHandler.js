module.exports = (error, req, res, next) => {
    // TODO add logging service call here
    res.status(error.status).send({ error })
}