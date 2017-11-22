const bcrypt = require('bcrypt');
const db = require('../bin/db');
const express = require('express');
const router = express.Router();
const config = require('../bin/config');

router.get('/', function(req, res, next) {
  res.redirect("/users/login");
});

router.get('/login', function (req, res) {
  res.render('login', {message: ''});
});

router.post('/login', (req, res) => {
  let user;
  db
    .one('SELECT * FROM public.user WHERE username = $1', [req.body.username])
    .then((dbUser) => {
      user = dbUser;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
        if (result) {
          req.session.user = user;
          res.redirect("/admin/");
        }
    })
    .then(() => {
      res.render('login', {message: 'User not found'});
    })
    .catch(err => {
      console.error(err);
      res.render('login', {message: 'User not found'});
    });
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect("/");
});

module.exports = router;
