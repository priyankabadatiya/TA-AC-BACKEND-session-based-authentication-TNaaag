var express = require('express');
var router = express.Router();
let User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) return next(err);
    console.log(user);
    res.redirect('/users/login');
  })
});

router.get('/login', (req, res, next) => {
  let error = req.flash('error')[0];
  res.render('login', {error});
});

router.post('/login', (req, res, next) => {
  let {email, passwd} = req.body;
  if(!email || !passwd) {
    req.flash("error", "Email/Passwd is required");
    return res.redirect('/users/login');
  }
  User.findOne({email}, (err, user) => {
    if(err) return next(err);
    if(!user) {
      req.flash("error", "Email is not registered");
      return res.redirect('/users/login');
    }
    user.verifyPasswd(passwd, (err, result) => {
      if(err) return next(err);
      if(!result) {
        req.flash("error", "Password is invalid");
        return res.redirect('/users/login');
      }
      req.session.userId = user.id;
      res.redirect('/users');
    })
  })
});
module.exports = router;
