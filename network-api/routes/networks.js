var express = require('express');
var router = express.Router();
var https = require('https');

var graph = require('../utils/graphTransform');

/* GET users listing. */
router.get('/:username', function(req, res, next) {
  var username = req.params.username;

  https.get('https://bio.torre.co/api/people/'+username+'/network?deep=1', (resp)=>{
    let data = '';

    resp.on('data', (chunk)=>{
      data += chunk;
    })
  
    resp.on('end', ()=>{
      //Process Data
      //Get the root 
      let result = graph.graphToTree(JSON.parse(data), username)
      console.log(result)
      res.send(result);
    })
  }).on('error', (error)=>{
    res.send({error:true,message:'Something went wrong ...'})
  });
});

module.exports = router;
