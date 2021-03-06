require('dotenv').config();

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    LocalStrategy = require("passport-local"),
    passport = require("passport"),
    User = require("./models/user"),
    methodOverride = require("method-override"),
    flash = require("connect-flash")


// Google Map API Key: AIzaSyCE3v_39YuXYtmgn3qBz49XHVXk77Nb6nw
// Geocodng API key: AIzaSyDQvD8f8dvVsRKFfIU6GdQ8oRYon8ZMBIQ
//requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); //seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This word is to be encrypted",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){		
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();		
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


//SERVER LISTENING  
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server Awaken!")
});

