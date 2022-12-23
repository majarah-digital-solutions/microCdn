module.exports = (req, res, next) => {
    console.log(req.ip);
    next();
}