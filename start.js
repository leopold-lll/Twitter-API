
const express = require("express"),
	app         = express(),
	bodyParser  = require("body-parser"),
	Router      = express.Router(),
	Routes      = require("./route/Routes.js"),
  Routes_tweet= require("./route/Routes_tweet.js")//,
  //fs          = require("fs");

// Body-parser (To parse the request body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routig prefix
app.use("/api/v1/twitter", Router);

// routing with local database
/*
Router.route('/')
  .get(Routes.getLastTweet)
  .post(Routes.sendTweet);

Router.route('/search')
  .get(Routes.getTweetsByWords);*/

// routing with database on mLab
Router.route('/')
  .get(Routes_tweet.getLastTweet)
  .post(Routes_tweet.sendTweet);

Router.route('/search')
  .get(Routes_tweet.getTweetsByWords);

// pagine interne
app.get("/", function(req, res){
  console.log("Pagina principale");
  res.redirect("https://github.com/leopold-lll/Twitter-API");
})

// Set the port number
app.set("port", process.env.PORT || 3000);

// Start the service
app.listen(app.get("port"), function(){
  console.log("Sample node server Started @ " + new Date() + " Running on port number: " + app.get("port"));
});