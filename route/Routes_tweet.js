const tweet = require("../models/tweet");
const regex = require("./RegExp");

// data from query: req.query.studentid
// data from path:  req.params.id
// data from body:  req.body.studentId

// twitter
exports.sendTweet = function(req, res) {		//POST
	console.log("\nfunction sendTweet");

	// get parameters
	var tweetOwner = req.body.tweetOwner;
	// Date.UTC(year, month, day, hours, minutes, seconds, millisec) -> give UTC from date
	// Date.now() -> get the actual UTC
	var tweetDate = Date.now();
	var tweetText = req.body.tweetText;

	// check parameters
 	if(regex.check_tweetOwner(tweetOwner) && regex.check_tweetText(tweetText)){
 		// create a new tweet called t
		var t = new tweet({
			tweetOwner: tweetOwner,
			tweetDate: 	tweetDate,
			tweetText: 	tweetText
		});
	 	console.log("add Tweet: " + JSON.stringify(t));

	 	// save the created tweet on the database
		t.save();
		return res.sendStatus(200);
	} else{
		return res.status(400).json({message: 'Wrong parameter'});
	}
};

exports.getLastTweet = function(req, res) {		//GET
	console.log("\nfunzione getLastTweet");

	// the exist or not of the userID determines two different accesses to the database that are very similar change only the find query
	if(req.query.userID !== undefined){
		var owner = req.query.userID;

		//check owner with regular expression
		if(regex.check_tweetOwner(owner)){
			tweet.
		        find({tweetOwner: owner}).
		        sort({tweetDate: -1}).limit(1).
		        exec(function(err, last_tweet) {
		            if(last_tweet.length>0){
		            	res.json(last_tweet[0]);
		            } else{
		            	res.status(400).json({message: 'Tweets not found'});
		            }
		        });
		} else{
			return res.status(400).json({message: 'Wrong parameter'});
		}
	} else{
		tweet.
	        find({}).
	        sort({tweetDate: -1}).limit(1).
	        exec(function(err, last_tweet) {
	            if(last_tweet.length>0){
	            	res.json(last_tweet[0]);
	            } else{
	            	res.status(400).json({message: 'Tweets not found'});
	            }
	        });
	}
};

// twitter/search/words
exports.getTweetsByWords = function(req, res) {//GET
	console.log("\nfunzione getTweetsByWords");

	var words = req.query.words;
	// check parameter
	if(words!==undefined){
		if(regex.check_words(words)){

			// build a string like ".*abc.*|.*vwxyz.*" for a regular expression that match all tweetText that contain "abc" or "vwxyz"
			var regex_str = "";
			for(var i=0; i<words.length; i++){
				regex_str += ".*" + words[i] + ".*|";
			}
			regex_str = regex_str.slice(0, -1); // cut the last char

			// look in the database for requested values
			tweet.
		        find({"tweetText" : {$regex : regex_str}}).	
		        exec(function(err, tweets) {
		            if(tweets.length>0){
		            	res.json(tweets);
		            } else{
		            	res.status(400).json({message: 'Tweets not found'});
		            }
		        });

		} else{
			return res.status(400).json({message: 'Wrong parameter'});
		}
	} else{
		return res.sendStatus(400);
	}
};