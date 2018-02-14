const model = require("./model.js");
const db = new Array();

exports.getAll = function(){
	return db;
};

exports.length = function(){
	return db.length;
};

exports.top = function(){
	return db[db.length-1];
};

exports.insert = function(node){
	db.push(node);
};

exports.topByOwner = function(owner){
	for(var i = db.length-1; i>= 0; i--) {
		if(db[i]["tweetOwner"] == owner){
			return(db[i])
		}
	};
	return(-1)
};

exports.getElementsByWords = function(tweets, words){
	var n = words.length;
	for(var i = db.length-1; i>= 0; i--) {
		//console.log("\t" + db[i]["tweetText"] + ":")	//debug
		for(var j=0; j<n; j++){
			//console.log("\t\t" + words[j] + " -> " + db[i]["tweetText"].search(words[j]));	//debug
			if( db[i]["tweetText"].search(words[j])!=-1){	// found a correspondence
				tweets.push(db[i]);
				break;
			}
		}
	}
};
