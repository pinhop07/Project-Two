// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var User = require('./models')['Users'];

// Sets up the Express App
var app = express();

// Connection to the MySQL database
var connection = require('./config/connection.js');

// Sets up passport to authenticate requests and
// sessions to store information about the user across requests
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(username, password, done){
    User.find({ where: {email: username}})
      .then(function(user){
        if(!user)
          return done(null, false, {message: "User entered does not exist."});
        else if(!hashing.compare(password, user.password))
          return done(null, false, {message: "Incorrect Password."});
        else
          return done(null, user);
      });
  }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.find(id)
    .success(function(user){
      done(null, user);
    }).error(function(err){
        done(new Error('The user ' + id + 'does not exist.'));
    });   
});

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Set up the server to recogonize that we are using handlebars in the client
// and set up the server to have the ability to use handlebars templating in the view
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// Routes
var userRoutes = require('./controllers/user_controller.js');
app.use('/', userRoutes);

// Define a port to listen for incoming requests 
// and tell the user something good about themselves
var port = process.env.PORT || 3000;

// Start our server so that it can begin listening to client requests.
app.listen(port, function(){
  // Log (server-side) when our server has started
  console.log('Listening on PORT ' + port);
});