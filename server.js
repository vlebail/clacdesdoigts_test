
var request = require('request')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('./mongo.js')
var connexion = require('./connexion.js');
var request = require('request');
var EventSource = require('eventsource');

var jsonParser = bodyParser.json()
app.use(bodyParser.json({ type: 'application/json' }))

var requeteServeurData = new EventSource('http://163.172.145.75//Messages/change-stream');//NODE 1

//Webhook server
app.post('/result',function(req,res){
  var updateMongo = new Promise(function(resolve,reject){
    resolve(mongo.utilisationMongoDB(mongo.updateMongoDB,req.body));//update BDD
  });
  updateMongo.then(function(){
    console.log("Ligne updatée")
  })
});

//starting server : init connexion with webhook and listen to NODE 1
app.listen(80,function() {
  console.log('serveur');
  var NLPPromise = new Promise(function(resolve,reject){
    resolve(connexion.lancerNGrok());
  });
  NLPPromise.then(function(){
    console.log("NGrok Lancé");
  });
    ecouteNode1();
});

//calls NODE1 then insert asynchronously in Mongo on message
var ecouteNode1 = function(){
  requeteServeurData.addEventListener('data',function(reponseServeur){
    var insertMongo = new Promise(function(resolve,reject){
      var reponseToJson = JSON.parse(reponseServeur.data);
      if (reponseToJson.type==='create'){
        var data = reponseToJson['data'];
        resolve(mongo.utilisationMongoDB(mongo.insertDansMongoDB,data));//insert BDD
      }
      else reject();
    });
    insertMongo.then(function(){
      console.log('Ligne insérée')
    }).catch(function(){
      console.log(console.log("ligne non insérée"));
    })
  });}
