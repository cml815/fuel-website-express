var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fuel Copy' });
})

router.get('/about', function (req, res) {
    res.render('about', {title: 'About'})
});

router.get('/work', function(req, res, next) {
  res.render('work', { title: 'What We Do' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Get in Touch!' });
});

module.exports = router;


