
// all function look if some forbidden characters are find in the passed string

exports.check_tweetOwner = function(id) {
	var regex = RegExp("[^a-zA-Z0-9]");
	return(!regex.test(id));
}

exports.check_tweetText = function(text) {
	var regex = RegExp("[^a-zA-Z0-9èéòàùì .,!?()<>'^+*-_]");
	return(!regex.test(text));
}

exports.check_words = function(words) {
	if(!Array.isArray(words)){
		return(false);
	}
	// i omit the check  to verify if array is empty, it's possible to get all the tweets in this method
	var regex = RegExp("[^a-zA-Z0-9èéòàùì]");
	for(var i=words.length-1; i>=0; i--){
		if(regex.test(words[i])){
			return(false);
		}
	}
	return(true);
}