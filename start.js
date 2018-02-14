
const express= require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	Router     = express.Router(),
	Routes     = require("./route/Routes.js")

// Body-parser (To parse the request body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routig prefix
app.use("/api/v1/twitter", Router);

// routing
Router.route('/')
  .get(Routes.getLastTweet)
  .post(Routes.sendTweet);

Router.route('/search')
  .get(Routes.getTweetsByWords);
  

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

