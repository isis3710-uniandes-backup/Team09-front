//const express = require('express');
//const app = express();
const db = require(__dirname.slice(0,__dirname.length-11)+'/models/');

module.exports={
	getComments: function(req, res){
		console.log("The comments");
		return db.Comments.findAll()
    		.then((comments) => res.send(comments))
    		.catch((err) => {
      		console.log('There was an error querying comments', JSON.stringify(err))
      	return res.send(err)
    });
	},
	getComment: function(req, res){
		console.log(req.params.commentid);
		let id=parseInt(req.params.commentid);
		return db.Comments.findByPk(id)
    		.then((comment) => res.send(comment))
    		.catch((err) => {
      		console.log('There was an error querying the comment', JSON.stringify(err))
      	return res.send(err)
    });
	},
	postComment: function(req, res){
		console.log("Post comment");
		return db.Comments.create({ "canvasId":req.body.canvasId, "comm":req.body.comm, "user":req.body.user })
    		.then((comment) => res.send(comment))
    		.catch((err) => {
      	console.log('***There was an error creating a comment', JSON.stringify(err))
      return res.status(400).send(err)
    });
	},
	putComment: function(req, res){
		console.log("Put Comment "+req.params.commentid);
		const id = parseInt(req.params.commentid)
  		return db.Comments.findByPk(id)
  			.then((comment) => {
    		//const { username, email, password } = req.body
    	if(comment!==null){
    	return comment.update({ "canvasId":req.body.canvasId, "comm":req.body.comm, "user":req.body.user })
      		.then(() => res.send(comment))
      		.catch((err) => {
        	console.log('***Error updating comment', JSON.stringify(err))
        	res.status(400).send(err)
      	})}
      	else{
      		res.status(400).send("No se encuentra el objeto")
      	}
  	});
	},
	deleteComment: function(req, res){
		console.log("Delete comment "+ req.params.commentid);
		const id = parseInt(req.params.commentid)
  		return db.Comments.findByPk(id)
    		.then((comment) => comment.destroy())
    		.then(() => res.send( comment ))
    			.catch((err) => {
      			console.log('***Error deleting comment', JSON.stringify(err))
      		res.status(400).send(err)
    });
	}
}