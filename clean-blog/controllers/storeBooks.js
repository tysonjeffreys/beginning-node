const Book = require('../models/Books.js')



module.exports = (req, res) => {
    //async (error) => {

    Book.create(
        req.body
        
    ,(error, book) => {
        console.log(book)
    })
    res.redirect('/')
}
