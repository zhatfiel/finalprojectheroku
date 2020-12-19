//Budget API

const express = require('express');
const app = express();
const cors = require('cors');
const port = 80;
var fs = require('fs');
app.use(express.json())

const mongoose = require('mongoose');
const myBudgetModel = require('./models/myBudget_schema');
const { DefaultDeserializer } = require('v8');
//let url = 'mongodb://localhost:27017/mongodb_demo';
let url = 'mongodb+srv://admin:admin@final.k3weo.mongodb.net/mongoDB?retryWrites=true&w=majority';

app.use(cors());

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

//populate pie chart
app.get('/budget', function(req, res) {
    // console.log("read file, turned to string, parsed to JSON");
    // var json = JSON.parse(fs.readFileSync('./budgetData.json').toString());
    // res.json(json);

    //mongoose implementation of grabbing json data from mongodb collection
    console.log("fetching all data from myBudget collection");
    var budget = { "budget": []};
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                myBudgetModel.find({})
                                .then((data)=>{
                                    console.log("data length: " + data.length);
                                    for (var i = 0; i < data.length; i++){
                                        console.log(data[i]);
                                        budget.budget[i] = data[i];
                                    }
                                    res.send(budget);
                                    mongoose.connection.close();
                                })
                                .catch((e)=>{
                                    console.log(e);
                                    mongoose.connection.close();
                                })
            })
            .catch((e)=>{
                console.log(e);
                mongoose.connection.close();
            })
});

//insert new data to db/collection
app.post('/add-data', function(req, res) {
    console.log("inserting new data to mongoDB");
    let newData = new myBudgetModel(req.body);
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            myBudgetModel.insertMany(newData)
                            .then((data)=>{
                                console.log("********  Insert newData ********");
                                console.log(data);
                                mongoose.connection.close();
                            })
                            .catch((e)=>{
                                console.log(e);
                                mongoose.connection.close();
                            })
        })
        .catch((e)=>{
            console.log(e);
            mongoose.connection.close();
        })
    res.status(200);
    res.send('success');
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});