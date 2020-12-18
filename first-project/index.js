const express = require('express')
const app = express()
const path = require('path')
app.use(express.static('public'))

app.listen(3000, () => {
    console.log("App listening on port 3000")
})



app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'about.html'))
})


/*const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/about')
        res.end(res)
    else if(req.url === '/contact')
        res.end('The contact page')
    else if(req.url === '/')
        res.end('The home page')
    else {
        res.writeHead(404)
        res.end('Page not found')
    }
    

    
});

server.listen(3000)
*/