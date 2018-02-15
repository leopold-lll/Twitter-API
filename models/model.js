// create a object Tweet
module.exports = function (_id, tweetOwner, tweetDate, tweetText) {
  this._id 			= _id;
  this.tweetOwner 	= tweetOwner;
  this.tweetDate	= tweetDate;
  this.tweetText 	= tweetText;
};