'use strict';

const converter=require('../utils/converter');
const sender=require('../utils/sender');
const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/email', [
  // to must be an email
  // from must be an email
  check('to').isEmail(),
  check('from').isEmail(),
], function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
  // convert subject and body to plain text
  const email = converter.addText(req.body);

  var client=new sender.initialize();
  client.send(email).then(function(result){
    res.set('Content-Type', 'application/json')
    .status(result.statusCode)
    .send(result.headers)
  })
})

module.exports = router;
