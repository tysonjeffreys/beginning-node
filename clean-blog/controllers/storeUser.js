const User = require('../models/User.js')
const path = require('path')


module.exports = (req,res) => {
    User.create(req.body, (error, user) => {
        console.log(error)
        if(error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.session.validationErrors = validationErrors
            console.log(validationErrors)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}