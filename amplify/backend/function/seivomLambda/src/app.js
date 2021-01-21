/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "movies";
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get("/movies", function(req, res) { //get all 

  let queryParams = {
    TableName: tableName,
    limit: 100,
  }

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err, url: req.url, body: req.body});
    } else {
      res.json(data.Items);
    }
  });
});

/************************************
* HTTP put method for insert object *
*************************************/

app.put('/movies', function(req, res) { //update
  const { year, title, info } = req.body;
  const params = {
    TableName: tableName,
    Key:{
        "year": year,
        "title": title,
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.castMem=:c, info.genre=:g, info.lang=:l",
    ExpressionAttributeValues:{ //replace for changedParams in integration stg
        ":r":info.rating,
        ":p":info.plot,
        ":c":info.castMem,
        ":g":info.genre,
        ":l":info.lang,

    },
    ReturnValues:"UPDATED_NEW"
};

  dynamodb.update(params, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'Update movie succeeded!', url: req.url, data: data})
    }
  });
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post('/movies', function(req, res) {
  const { year, title, info } = req.body;
  var params = {
    TableName: tableName,
    Item: {
      "year":  year,
      "title": title,
      "info":  info
  }

};
  dynamodb.put(params, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'Added new movie successfully!', url: req.url, data: data})
    }
  });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete('/movies', function(req, res) {
  const { year, title } = req.body;
  const params = {
    TableName: tableName,
    Key:{
      "year":  year,
      "title": title,
    },
  }
  dynamodb.delete(params, (err, data)=> {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});
app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
