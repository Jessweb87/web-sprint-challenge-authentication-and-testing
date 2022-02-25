const db = require('./auth-model')

const checkBodyValid = (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        next({status: 422, message: "Username and password required"})
    } else {
        next()
    }
}

const checkUsernameExists = async (req, res, next) => {
    try {
        const [ user ] = await db.findBy({username: req.body.username})
        if (user) {
            next({status: 422, message: "username taken "})
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}

const validateUserExists = async (req, res, next) => {
    try {
        const [ user ] = await db.findBy({username: req.body.username})
        if (!user) {
            next({status: 422, message: "Invalid credentials"})
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}



module.exports = {
    checkUsernameExists,
    validateUserExists,
    checkBodyValid,
}