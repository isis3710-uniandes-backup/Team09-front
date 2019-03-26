//const express = require('express');
//const app = express();
const db = require(__dirname.slice(0,__dirname.length-11)+'/models/');
const datify = require('../datify.js');

module.exports={
	getSessions: function(req, res){
		console.log("The sessions");
		return db.Sessions.findAll()
    		.then((sessions) => res.send(sessions))
    		.catch((err) => {
      		console.log('There was an error querying sessions', JSON.stringify(err))
      	return res.send(err)
    });
	},
	postSession: function(req, res){
		console.log("Post session");
		return db.Sessions.create({ "userId":req.body.userId, "startTime":datify.getDate(), "entTime":null })
    		.then((session) => res.send(session))
    		.catch((err) => {
      	console.log('***There was an error creating a user', JSON.stringify(err))
      return res.status(400).send(err)
    });
	},
	putSession: function(req, res){
		console.log("Put Session "+req.params.userid);
		const id = parseInt(req.params.userid)
  		return db.Sessions.findByPk(id)
  			.then((session) => {
    		//const { username, email, password } = req.body
    	if(session!==null){
    	return session.update({ "userId":req.body.userId, "startTime":req.body.startTime, "entTime":req.body.entTime })
      		.then(() => res.send(session))
      		.catch((err) => {
        	console.log('***Error updating user', JSON.stringify(err))
        	res.status(400).send(err)
      	})}
      	else{
      		res.status(400).send("No se encuentra el objeto")
      	}
  	});
	},
	deleteSession: function(req, res){
		console.log("Delete session "+ req.params.sessionid);
		const id = parseInt(req.params.sessionid)
  		return db.Sessions.findByPk(id)
    		.then((session) => session.destroy())
    		.then(() => res.send( session ))
    			.catch((err) => {
      			console.log('***Error deleting user', JSON.stringify(err))
      		res.status(400).send(err)
    });
	}
}