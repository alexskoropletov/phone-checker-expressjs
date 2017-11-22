const express = require('express');
const router = express.Router();
const Joi = require('joi');
const admin = require('../bin/admin');
const config = require('../bin/config');

router.get('/', function (req, res) {
  res.render('index', {});
});

router.post('/', function (req, res) {
  Joi
    .validate(req.body, config.validation.phoneCheckSchema)
    .then(() => admin.findItem(req.body))
    .then((phone) => {
      let result = {message: 'Phone doesn\'t exist'};
      if (phone) {
        result = {messageSuccess: 'Phone exists'};
      }
      res.render('index', result);
    })
    .catch(err => {
      console.error(err);
      res.render('index', {message: err.message || err.details.map(item => item.message).join('\n')});
    })
  ;
});

module.exports = router;
