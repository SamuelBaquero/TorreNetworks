var express = require('express');
var router = express.Router();
var https = require('https');

/* GET users listing. */
router.get('/:username', function(req, res, next) {
  var username = req.params.username;
  https.get('https://bio.torre.co/api/people/'+username+'/network?deep=1', (resp)=>{
    let data = '';

    resp.on('data', (chunk)=>{
      data += chunk;
    })
  
    resp.on('end', ()=>{
      res.send(data);
    })
  }).on('error', (error)=>{
    console.log('Error: '+error.message)
  });
});

module.exports = router;
