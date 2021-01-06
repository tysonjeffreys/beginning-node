const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileUpload')
const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

//const BlogPost = require('./models/Blogpost.js')
mongoose.connect('mongodb://localhost/my_database', {useNewURLParser:true})


app.listen(4000, () => {
    console.log('App listening in port 4000')
})



//middleware to validate empty field in new post. If empty post not made and redirection
//to post page
const validateMiddleWare = (req,res,next) => {
    if(req.files == null || req.body.title == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}
app.use('/posts/store', validateMiddleWare)


//refactoring the home page
app.get('/', homeController)
/*
app.get('/', async (req,res) => {
    const blogposts = await BlogPost.find({})
    //BlogPost.find() returns and array of objects from the database
    //console.log(blogposts)
    res.render('index', {
        blogposts
    });
})
*/



app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
})

app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')
})

//refactor get post by id
app.get('/post/:id', getPostController)
/*
app.get('/post/:id', async (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    const blogpost = await BlogPost.findById(req.params.id)
    console.log(blogpost)
    res.render('post', {
        blogpost
    })
})
*/
app.get('/posts/new', newPostController)

/*
app.post('/posts/store', (req,res) => {
    console.log(req.body)
    BlogPost.create(req.body, (error,blogpost) => {
        //console.log(blogpost)
        res.redirect('/')
    })
})
*/

//same function as above but with async/await
app.post('/posts/store', async (req,res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'public/img', image.name),    
    async (error) => { 
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        //console.log('This is the request object from create.ejs ' + req.body.title)
        res.redirect('/')
    })
     
       
})

app.get('/posts/:find', async(req, res) => {
    let search = `${req.query.title}`
    const regex = new RegExp(search, 'i')
    console.log(req.query)
      
    const titleposts = await BlogPost.find({title:{$regex: regex}}, (error, blogspot) => {
        
        console.log(error, blogspot)
    })
    res.render('titlesearch', {
        titleposts
    });    


})
/*
app.get('/', async (req,res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts: blogposts
    });
})

*/