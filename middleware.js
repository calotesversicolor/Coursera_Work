const jwt = require("jsonwebtoken")

class Middleware {
    static async auth(req, res, next) {
        const token = req.cookies.token
        if (!token) {
            return res.json("Пользователь не авторизован")
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.json("Пользователь не авторизован")
            req.user = user
            next()
        })
    }

    static async ident(req, res, next) {
        const token = req.cookies.token
        if (!token || token === undefined) {
            return next()
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (!err) req.user = user
            next()
        })
    }
}

module.exports = Middleware