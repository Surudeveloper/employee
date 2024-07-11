const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const { MongoClient } = require('mongodb');
const fs = require('fs')
var XLSX = require("xlsx");

const port = 8001
const mongoUrl = 'mongodb+srv://sureshkumar1202028:123@cluster0.v42mwb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const app = express()
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(fileUpload())


app.get('/', (req, res) => {
    res.render('index')
})

app.post('/upload', async (req, res) => {
    const client = new MongoClient(mongoUrl);
    try {
      
        await client.connect()
        const db = client.db('projectDB');
        const collection = db.collection('employee');
        console.log('Connected successfully to MongoDB server');

        const image = req.files.upldFile
        const filename = req.body.upldFileName
        const filePath = `${__dirname}/public/file/${image.name}`

        await image.mv(filePath)
        
        // Read the uploaded Excel file
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
    
        // Convert sheet to JSON
        const data = XLSX.utils.sheet_to_json(sheet);
    
        // Delete the file after reading it
        // fs.unlinkSync(filePath);

        const bulkOps = data.map(item => ({
            updateOne: {
                filter: { id: item.id }, // Assuming each item has a unique _id field
                update: { $set: item },
                upsert: true
            }
        }));

        // Execute bulk operations
        const result = await collection.bulkWrite(bulkOps);
        console.log(result)
        res.send('ok')

    } catch (err) {
        console.log('error occured',err);
    }
    finally{
        await client.close();
    }
    
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
