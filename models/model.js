/*globals require, module */

// create a object Assignment
module.exports = function (assignmentId, studentId, assignmentType, assignmentContent) {
  this.studentId 			= studentId;
  this.assignmentId 		= assignmentId;
  this.assignmentType 		= assignmentType;
  this.assignmentContent 	= assignmentContent;
};