const { model } = require("../models/BlogPost");
module.exports = (req,res) => {
    res.render('register', {
        //errors: req.session.validationErrors}) //render register.ejs
        errors: flash('validationErrors')
    })
}