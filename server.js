//Budget API

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
var fs = require('fs');
app.use(express.json())

const mongoose = require('mongoose');
const myBudgetModel = require('./models/myBudget_schema');
const { DefaultDeserializer } = require('v8');
const url = process.env.MONGODB_URI;

app.use(cors());

app.use('/', express.static('public'));

app.get('/login', function(req, res) {
    var auth0 = new auth0.WebAuth({
        domain: 'https://zhatfiel-final-project.herokuapp.com/',
        clientID: 'WcMiRD38uQySAvwyu0pD05OyyY92RJ31'
      });
});

//populate pie chart
app.get('/budget', function(req, res) {

    //grabbing json data from mongodb cluster collection
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
    console.log(`API served at ${port}`);
});