// grab the things we need
var credentials = require('./../credential');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
    credentials.url,
    {useMongoClient: true}
).then(function() {
    console.log("connection successfull");
}).catch(function(error){
    console.log(error);
});

var Schema = mongoose.Schema;

// create a schema
var tweetSchema = new Schema({
	tweetOwner: { type: String, required: true },
	tweetDate: 	{ type: Number, required: true },
	tweetText: 	{ type: String, required: true }
});

// create a model and using it
var Tweet = mongoose.model('Tweet', tweetSchema);

// make this available
module.exports = Tweet;