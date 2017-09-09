
  var MongoClient = require('mongodb').MongoClient;
  var assert = require('assert');
  var ObjectId = require('mongodb').ObjectID;
  var url = 'mongodb://admin:root@ds127854.mlab.com:27854/clacdesdoigts';

  exports.utilisationMongoDB = function(operationBDD,datasOperation){
    MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    operationBDD(db,datasOperation, function() {
        db.close();
    });
  });
  }
  exports.updateMongoDB = function(db,dataServeur,callback){
    db.collection('Messages').update(
       { "nlp_id" : dataServeur.nlp_id },
       { $set: { "intent": dataServeur.intent},
       $unset:{"nlp_id":""} }
    );
  }
  exports.insertDansMongoDB = function(db,dataServeur,callback){
    db.collection('Messages').insertOne(dataServeur,false);
  }
