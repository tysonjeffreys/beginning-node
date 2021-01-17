const Book = require('../models/Books.js')
const path = require('path')


module.exports = (req, res) => {
    
    console.log("req.body", req.body)
    let image = req.files.image;
    console.log(image.name)
    console.log(image)
    image.mv(path.resolve(__dirname,'..','public/img', image.name), async (error) => {
        await Book.create({...req.body, image:'/img/' + image.name})
        
    //,(error, book) => {
    //    console.log(book)
    //})
    res.redirect('/books')
})
}

