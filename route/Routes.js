const Db = require("../models/db.js");
const model = require("../models/model.js");

// data from query: req.query.studentid
// data from path:  req.params.id
// data from body:  req.body.studentId

// twitter
exports.sendTweet = function (req, res) {		//POST
	console.log("\nfunzione sendTweet");
	var new_id = Db.length();
	var new_obj;

	var tweetID = new_id;
	var tweetOwner = req.body.tweetOwner;

	var tweetDate = Date.now();
	// Date.UTC(year, month, day, hours, minutes, seconds, millisec) -> give UTC from date
	// Date.now() -> get the actual UTC

	var tweetText = req.body.tweetText;
 	var new_obj = new model(tweetID, tweetOwner, tweetDate, tweetText);

 	console.log("add Tweet: " + JSON.stringify(new_obj));
	Db.insert(new_obj);
	return res.sendStatus(200);
};

exports.getLastTweet = function(req, res) {		//GET
	console.log("\nfunzione getLastTweet");
	if(req.query.userID !== undefined){
		var owner = req.query.userID;
		var tweet = Db.topByOwner(owner);
		if(tweet==-1){
			return res.json({message: 'Tweets not found'});
		} else{
			return(res.json(tweet));
		}
	} else{
		if(Db.length()>0){
			return(res.json(Db.top()));
		} else{
			return res.json({message: 'Tweets not found'});
		}
	}
};

// twitter/search/words
exports.getTweetsByWords = function(req, res) {//GET
	console.log("\nfunzione getTweetsByWords");

	var words = req.query.words;
	if(words!==undefined){
		//console.log("length: " + words.length + " -> words: " + words);	//debug
		var tweets = new Array()
		Db.getElementsByWords(tweets, words);
		if(tweets.length==0){
			return res.json({message: 'Tweets not found'});
		} else{
			return(res.json(tweets));
		}
	} else{
		return res.sendStatus(400);
	}
};