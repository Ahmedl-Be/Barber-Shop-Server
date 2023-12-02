export default (asyncfun) => {
    return (req, res, next) => {
        asyncfun(req, res, next).catch((err) => {
            next(err)
        }
        )
    }
}
