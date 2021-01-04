const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const BlogPost = require('./models/Blogpost.js')
mongoose.connect('mongodb://localhost/my_database', {useNewURLParser:true})


app.listen(4000, () => {
    console.log('App listening in port 4000')
})


/*
app.get('/', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('index')
})
*/
app.get('/', async (req,res) => {
    const blogposts = await BlogPost.find({})
    //BlogPost.find() returns and array of objects from the database
    //console.log(blogposts)
    res.render('index', {
        blogposts
    });
})

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
})

app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')
})

app.get('/post/:id', async (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    const blogpost = await BlogPost.findById(req.params.id)
    console.log(blogpost)
    res.render('post', {
        blogpost
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

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
    await BlogPost.create(req.body)
        console.log('This is the request object from create.ejs ' + req.body.title)
        res.redirect('/')
    })


//Find a specific post by searching the titles
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



app.get('/', async (req,res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts: blogposts
    });
})
