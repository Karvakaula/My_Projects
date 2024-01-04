const JWT = require('jsonwebtoken')
const createError = require('http-errors')


module.exports = {
    signAccesstoken: (userId) => {
        return new Promise((resolve, reject )=> {
            const payload  = {
            }
            const secret = process.env.ACCESS_TOKEN_SECRET // .env filestä haettu tokeni
            const options = {
                expiresIn: "5min",
                issuer: "something.com", // en ole täysin varma issuerin tarkoituksesta
                audience: userId,
            }
            JWT.sign(payload, secret, options, (error, token) => {
                if (error) return reject(error)
                resolve(token)
            })
        })
    }
}