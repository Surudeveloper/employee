const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const app = express()

const port = 8102

//static file
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

//middleware
app.use(bodyParser.json())
app.use(fileUpload())

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/upload', (req, res) => {
    console.log(req.files);
    console.log(req.body);
    const image = req.files.upldFile
    const name = req.body.upldFileName

    image.mv(`${__dirname}/public/images/${image.name}`, (err, data) => {
        if (err) throw err;
        res.render('display', { title: name, image:image.name})
    })
    // res.send('ok')
})

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is listening to port ${port}`);
})