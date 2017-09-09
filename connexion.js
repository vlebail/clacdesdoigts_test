var ngrok = require('ngrok');
var request = require('request');

//fetch Authentication ID from NLP
var connexionNLP = function(urlNGrok){
  request.post(
    'http://163.172.145.75/Candidats/login',
    { json: { username:'VLEBAIL',
    email:'victor.lebail@ynov.com',
    password:'argon'} },
    function (error, response, body) {
      if (!error) {
        supprimerAdressesNLP(body);
        envoyerURLNLP(urlNGrok,body)
      }
    }
  );
}

//delete ALL recorded NLP server's address
var supprimerAdressesNLP = function(identifiantsNLP){
  var url = 'http://163.172.145.75/Candidats/'+identifiantsNLP.userId+'/webhooks?access_token='+identifiantsNLP.id
  request.delete(
    url,
    function(error,response,body){
      if (error) console.log(error);
    }
  );
}

//send URL of local server to NLP server
var envoyerURLNLP = function(ngrokURL,token){
  request.post(
    'http://163.172.145.75/Candidats/'+token.userId+'/webhooks?access_token='+token.id,
    {
      json:
      {
        "url": ngrokURL+'/result',
        "token": token.id,
      }
    },
    function(error,response,body){
      if (error) console.log(error);
    }
  );
}

//launch ngrok then connect to NLP
exports.lancerNGrok = function(){
  var url = {
    proto: 'http',
    addr: 80
  };
  var res;
  ngrok.connect({
    proto: 'http',
    addr: 80
  },function(error,urlServeur){
    if (error) console.log(error);
    connexionNLP(urlServeur);
  });
}
