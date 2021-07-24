var express = require('express');
var router = express.Router();
let User = require('../models/users');

/* render users page */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.render('page');
});

//render register page
router.get('/register', (req, res, next) => {
  res.render('register');
});

//handle register request
router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) return next(err);
    console.log(user);
    res.redirect('/users');
  })
});

//render login page
router.get('/login', (req, res, next) => {
  res.render('login');
});

//processing login request
router.post('/login', (req, res, next) => {
  let {email, passwd} = req.body;
  if(!passwd || !email) {
    return res.redirect('/users/login');
  }
  User.findOne({email}, (err, user) => {
    if(err) return next(err);
    if(!user) {
      return res.redirect('/users/login');
    }
    user.verifyPasswd(passwd, (err, result) => {
      if(err) return next(err);
      if(!result) {
        return res.redirect('/users/login');
      }
      req.session.userId = user.id;
      res.redirect('/users');
    })
  })
})
module.exports = router;
