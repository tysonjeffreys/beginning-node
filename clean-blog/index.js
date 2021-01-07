const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileUpload')

//controllers
const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const findPostController = require('./controllers/findPost')
const validateMiddleWare = require('./middleWare/validationMiddleware')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)


//const BlogPost = require('./models/Blogpost.js')
mongoose.connect('mongodb://localhost/my_database', {useNewURLParser:true})
app.listen(4000, () => {
    console.log('App listening in port 4000')
})


//middleware to validate empty field in new post. If empty post not made and redirection
//to post page




app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', newPostController)
app.post('/posts/store', storePostController)
app.get('/posts/:find', findPostController)


app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
})

app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')
})


