const Book = require('../models/Books.js')



module.exports = (req, res) => {
    //async (error) => {
    console.log("req.body", req.body)
    Book.create(
        req.body
        
    ,(error, book) => {
        console.log(book)
    })
    res.redirect('/')
}
