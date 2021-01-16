const Books = require('../models/Books.js')

module.exports = async(req,res) => {
    const book = await Books.findById(req.params.id)
    res.render('book', {book})
}