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
  /**
   * Validation of the fields
   * to must be an email
   * from must be an email
   */
  check('to').isEmail(),
  check('to_name').custom(value => value.length>0),
  check('from').isEmail(),
  check('from_name').custom(value => value.length>0),
  check('subject').custom(value => value.length>0),
  check('body').custom(value => value.length>0),
], function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
  // add a text field of the html body
  const email = converter.addText(req.body);

  var client=new sender.initialize(); // you can specify a provider such as initialize('sendgrid')
  client.send(email).then(function(result){
    res.set('Content-Type', 'application/json')
    .status(result.statusCode)
    .send(result.headers)
  })
})

module.exports = router;
