const Db = require("../models/db.js");
const model = require("../models/model.js");

// dato da query: req.query.studentid
// dato da path:  req.params.id
// dato da body:  req.body.studentId

// Date.UTC(year, month, day, hours, minutes, seconds, millisec) -> give UTC from date
// Date.now() -> get the actual UTC

/*
// routing
Router.route('/')
  .get(Routes.getLastTweet);
  
Router.route('/search1/:word')
  .get(Routes.getTweetByWord);

Router.route('/search')
  .get(Routes.getTweetByWords);
*/

// twitter
exports.sendTweet = function (req, res) {			//POST
	console.log("\nfunzione sendTweet");
	var new_id = Db.length();
	var new_obj;

	tweetID = new_id;
	tweetOwner = req.body.tweetOwner;
	tweetDate = Date.now();
	tweetText = req.body.tweetText;
 	new_obj = new model(tweetID, tweetOwner, tweetDate, tweetText);

 	console.log("add Tweet: " + JSON.stringify(new_obj));
	Db.insert(new_obj);
	return res.sendStatus(200);
};

exports.getLastTweet = function(req, res) {	//GET
	console.log("\nfunzione getLastTweet");
	if(req.query.userID !== undefined){
		var owner = req.query.userID;
		var tweet = Db.topByOwner(owner);
		if(tweet==-1){
			return res.sendStatus(400);
		} else{
			return(res.json(tweet));
		}
	} else{
		if(Db.length()>0){
			return(res.json(Db.top()));
		} else{
			return res.sendStatus(400);
		}
	}
};

/*
//assignment
exports.getAllAssignments = function(req, res) {
	console.log("\nfunzione getAllAssignments");
	var all = Db.getAll();
	if(req.query.studentid !== undefined){
		var id = req.query.studentid;
		var list = [];
		for(i = 0; i < all.length; i++){
			if(all[i]['studentId'] == id){
				list.push(all[i]);
			}
		}

		if(list.length==0){

			return res.json({message: 'Student Id non trovato'});
		}else{
			return res.json(list);
		}
	} else {
		return res.json(all);
	}
};

//assignment/:id

exports.getAssignmentById = function(req, res) {
	console.log("\nfunzione getAssignmentById");
	var id = req.params.id;
	var element = Db.getById(id);
	if (element !== undefined){
		element = [element]
		return res.json(element);
	} else {
		return res.sendStatus(400);
	}
};

exports.removeAssignmentById = function(req, res) {
	console.log("\nfunzione removeAssignmentById");
	var id = req.params.id;
	var element = Db.getById(id);
	if (element !== undefined){
		Db.removeById(id);
		return res.json({message: 'Assignment ' + id + ' eliminato'});
	} else {
		return res.json({message: 'Assignment non trovato'});
	}
};

exports.updateAssignmentById = function(req, res) {	
	console.log("\nfunzione updateAssignmentById");
	var id = req.params.id;
	console.log("id: " + id);
	var found = Db.getById(id);
	if (found !== undefined){
		studentId = req.body.studentId;
		assignmentType = req.body.assignmentType;
		assignmentContent= req.body.assignmentContent;
		obj = new model(id, studentId, assignmentType, assignmentContent);
		console.log(JSON.stringify(obj))
		Db.updateById(id, obj);
		return res.json({message: 'Assignment ' + id + ' aggiornato'});
	} else {
		return res.json({message: 'Assignment non trovato'});
	}
};

exports.deleteAllAssignment = function(req, res) {
	console.log("\nfunzione deleteAllAssignment");
	Db.drop();
	return res.sendStatus(200);
};*/