const model = require("./model.js");
const db = new Array();

exports.length = function(){
	return db.length;
};

exports.getAll = function(){
	return db;
};

exports.getById = function(id){
	return db[searchByID(id)];
};

exports.removeById = function(id){
	var index = searchByID(id);

	if (index > -1){
		db.splice(index, 1);
	} 
	/* splice parte dalla posizione index nell'array (se negativo leggo dal fondo), 
	il numero seguente indica quanti elementi rimuovere, se ho 0 vado ad aggiugere
	3°, 4°, ... elemento sono le parti che aggiungo se al 2° posto ho 0 */
};

exports.drop = function(){
	db.splice(0, db.length);
};

exports.insert = function(node){
	db.push(node);
};

exports.updateById = function(id, node){
	var index = searchByID(id);
	if(index > -1){
		db[index] = node;
	}
};

var searchByID = function(id){
	var index = -1;
	for(i = 0; i < db.length; i++){
		if(db[i]["tweetID"] == id){
			index = i;
			break;
		}
	}
	return index;
}