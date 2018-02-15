
// import element
const express = require("express"),
	app         = express(),
	bodyParser  = require("body-parser"),
	Router      = express.Router(),
  Routes_tweet= require("./route/Routes_tweet.js");

// Body-parser (To parse the request body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routig prefix
app.use("/api/v1/twitter", Router);

// routing with database on mLab
Router.route('/')
  .get(Routes_tweet.getLastTweet)
  .post(Routes_tweet.sendTweet);

Router.route('/search')
  .get(Routes_tweet.getTweetsByWords);

// redirect to github
app.get("/", function(req, res){
  console.log("Main page");
  res.redirect("https://github.com/leopold-lll/Twitter-API");
})

// Set the port number
app.set("port", process.env.PORT || 3000);

// Start the service
app.listen(app.get("port"), function(){
  console.log("Node server Started at " + new Date() + " \nRunning on port number: " + app.get("port"));
});