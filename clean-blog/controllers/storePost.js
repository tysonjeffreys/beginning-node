const BlogPost = require('../models/BlogPost.js')
const path = require('path')


module.exports = (req,res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'..', 'public/img', image.name),    
    async (error) => { 
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        //console.log('This is the request object from create.ejs ' + req.body.title)
        res.redirect('/')
    })
}