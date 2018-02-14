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
 	if(check_tweetOwner(tweetOwner) && check_tweetText(tweetText)){
	 	console.log("add Tweet: " + JSON.stringify(new_obj));
		Db.insert(new_obj);
		return res.sendStatus(200);
	} else{
		return res.json({message: 'Wrong parameter'});
	}
};

exports.getLastTweet = function(req, res) {		//GET
	console.log("\nfunzione getLastTweet");
	if(req.query.userID !== undefined){
		var owner = req.query.userID;
		//check owner with regular expression
		if(check_tweetOwner(owner)){
			var tweet = Db.topByOwner(owner);
			if(tweet==-1){
				return res.json({message: 'Tweets not found'});
			} else{
				return(res.json(tweet));
			}
		} else{
			return res.json({message: 'Wrong parameter'});
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
		if(check_words(words)){
			//console.log("length: " + words.length + " -> words: " + words);	//debug
			var tweets = new Array()
			Db.getElementsByWords(tweets, words);
			if(tweets.length==0){
				return res.json({message: 'Tweets not found'});
			} else{
				return(res.json(tweets));
			}
		} else{
			return res.json({message: 'Wrong parameter'});
		}
	} else{
		return res.sendStatus(400);
	}
};

//___________________check parameter with regular expression_______________________________________________

function check_tweetOwner(id) {
	var regex = RegExp("[^a-zA-Z0-9]");
	return(!regex.test(id));
}

function check_tweetText(text) {
	var regex = RegExp("[^a-zA-Z0-9èéòàùì .,!?()<>'^+*-_]");
	return(!regex.test(text));
}

function check_words(words) {
	if(!Array.isArray(words)){
		return(false);
	}
	var regex = RegExp("[^a-zA-Z0-9èéòàùì]");
	for(var i=words.length-1; i>=0; i--){
		if(regex.test(words[i])){
			return(false);
		}
	}
	return(true);
}