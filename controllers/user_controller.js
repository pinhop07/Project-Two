var express = require('express');
var router = express.Router();
var Event = require('../models')['Events'];
var User = require('../models')['Users'];
var passport = require('passport');

//index route
router.get('/', function (req, res){
  //asks to book a reservation or login with manager
  res.render('index');
});

//SIGN UP
router.get('/signup', function(req, res){
  res.render('signup');
});

router.post('/signup', function(req, res){
  //creates new user from valid form
  //if the email exists
  console.log(req.body);

   User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  });

   res.redirect('login');
});

//LOGIN
router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', function(req, res){
  console.log(req.body);

  User.findAll({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then(function(data){
   
      if(data != ""){
        res.redirect('/manager');
      } else{
        //need to add message saying the password and user didn't match
        res.redirect('/login')
      }
  });

});

//displays calendar of available dates
router.get('/reserve', function (req, res){
  Event.findAll({
    attributes: ['id', 'name', 'date', 'startTime', 'endTime', 'location', 'availableSpots']
  }).then(function(data){

    res.render('reserveUser', {evt: data});
  });
});

router.get('/manager', function(req,res){
  Event.findAll({
    attributes:["id", "name", "date","startTime", "endTime", "location", "availableSpots"]
  }).then(function(data){
   
      res.render('manager', {evt: data});
     
  });
});

//takes in the information user inputs to reserve a booking
router.post('/create/reservation', function (req, res){
  User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  });
  //updates reservation and decreases available spots
  // res.redirect('/update/reservation/:id/:spots');
  res.redirect('/reserve');
});

//manager creates new event
router.post('/create/event', function(req, res){
  Event.create({
    name: req.body.name,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    availableSpots: req.body.availableSpots
  });

  res.redirect('/manager');
});

//allows manager to delete event on calendar
router.delete('/delete/event/:id', function(req, res){
  console.log(req.params.id);

  Event.destroy({
    where: {
      id: req.params.id
    }
  });

  res.redirect('/manager')
});

module.exports = router;
