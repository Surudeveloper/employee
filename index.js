var express = require('express')
const fastcsv = require('fast-csv')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const port = 8001


const app = express()
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(bodyParser.json())
app.use(fileUpload())


mongoose.connect('mongodb://127.0.0.1:27017/test')
    // mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        console.log('db connected');
    })
    .catch((err) => {
        console.log('db connection error', err);
    })


app.get('/', (req, res) => {
    res.render('index')
})

app.post('/upload', async (req, res) => {
    try {
        console.log(req.files);
        console.log(req.body);
        const image = req.files.upldFile
        const filename = req.body.upldFileName

        await image.mv(`${__dirname}/public/images/${filename}.xlsx`, async (err, data) => {
            if (err) {
                console.log("Error 1")
                throw err;
            }

            // var empData = path.join('./public/images/', filename + '.xlsx');
            // let stream = fs.createReadStream(empData);
            // let csvData = [];

            // let csvStream = fastcsv.parse().on("data", function (data) {
            //     csvData.push({
            //         //change series later
            //         id: data[0],
            //         name: data[1],
            //         phone: data[2],
            //         department: data[3],
            //         designation: data[4],
            //         salary: data[6],
            //         bankAccount: data[7],
            //         createddate: new Date(),
            //         lstupdateddate: new Date()
            //     });
            // }).on("end", async function () {
            //     csvData.shift(); // remove the first line: header
            //     var a = csvData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
            //     if (Array.isArray(a) && a.length > 0) {
            //         var count = 0;
            //         await a.forEach(async function (e) {
            //             employees.findOne({
            //                 id: e.id
            //             }, async function (err, doc) {
            //                 if (!err) {
            //                     if (doc) {
            //                         //update
            //                         var record = {}
            //                         record['bankAccount'] = e.bankAccount
            //                         await employees.update({ id: e.id }, { "$set": record })

            //                     } else {
            //                         var newEmployee = new employees({
            //                             name: e.name,
            //                             phone: e.phone,
            //                             department: e.department,
            //                             designation: e.designation,
            //                             salary: e.salary,
            //                             bankAccount: e.bankAccount,

            //                             createddate: e.createdate,
            //                             lstupdateddate: e.createdate,
            //                         });
            //                         newEmployee.save();
            //                     }
            //                 }
            //             });
            //             count++;
            //             if (a.length == count) {
            //                 res.render('display', { title: filename, image: image.name })
            //                 // res.sendStatus(200);
            //             }
            //         });
            //     } else {
            //         res.send('Empty Data is Present');
            //     }
            // })
            // stream.pipe(csvStream)

        })
    } catch (err) {
        console.log('error occured');
    }
    // res.send('ok')
    // image.mv(`${__dirname}/public/images/${image.name}`, (err, data) => {
    //     if (err) throw err;
    //     res.render('display', { title: filename, image:image.name})
    // })
})


/*
    xls => 10 emp data
    colum data=> id | name | phone | dept | bankA/C
    if exist then update bank detail
    else create new data 
*/

app.post('/updateEmployee', (req, res) => {
    var data = req.body

    // if(){

    // }
})



app.listen(port, (err) => {
    if (err) {
        console.log('error occured');
    } else {
        console.log(`server is listening to port ${port}`);
    }
})
