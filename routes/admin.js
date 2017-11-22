const express = require('express');
const router = express.Router();
const Joi = require('joi');
const admin = require('../bin/admin');
const config = require('../bin/config');

/**
 * checking users access
 */
router.all('*', function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
});

router.get('/', (req, res) => {
  admin
    .getList()
    .then(list => {
      res.render('admin/index', {list: list});
    })
  ;
});

router.get('/form', (req, res) => {
  let id = parseInt(req.query.id);
  if (id) {
    admin
      .getItem(id)
      .then(item => {
        res.render('admin/form', {item: item});
      })
    ;
  } else {
    res.render('admin/form', {item: {id: 0}});
  }
});

router.post('/form', (req, res) => {
  let id = parseInt(req.body.id);
  Joi
    .validate(req.body, config.validation.phoneEditSchema)
    .then(() => id ? admin.updateItem(req.body) : admin.addItem(req.body))
    .then(() => {
      res.redirect("/admin");
    })
    .catch(err => {
      console.error(err);
      res.render('admin/form', {
        item: req.body,
        message: err.detail || err.details.map(item => item.message).join('\n')
      });
    })
  ;
});

router.post('/delete', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Joi
    .validate(req.body, config.validation.phoneDeleteSchema)
    .then(() => admin.deleteItem(req.body))
    .then(() => {
      res.send(JSON.stringify({ response: 'OK' }));
    })
    .catch(err => {
      console.error(err);
      res.send(JSON.stringify({ response: 'Error' }));
    })
  ;
});

module.exports = router;
