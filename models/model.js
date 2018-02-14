// create a object Tweet
module.exports = function (tweetID, tweetOwner, tweetDate, tweetText) {
  this.tweetID 		= tweetID;
  this.tweetOwner 	= tweetOwner;
  this.tweetDate	= tweetDate;
  this.tweetText 	= tweetText;
};