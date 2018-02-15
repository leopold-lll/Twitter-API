// import element
var credentials = require('./../credential');
var mongoose = require('mongoose');

// connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(
	// get the credential from an external file that was ignored from github
    credentials.url,
    {useMongoClient: true}
).then(function() {
    console.log("Connection successfull");
}).catch(function(error){
    console.log(error);
});

var Schema = mongoose.Schema;

// create schema
var tweetSchema = new Schema({
	tweetOwner: { type: String, required: true },
	tweetDate: 	{ type: Number, required: true },
	tweetText: 	{ type: String, required: true }
});

// create a model and using it
var Tweet = mongoose.model('Tweet', tweetSchema);

// make this available
module.exports = Tweet;