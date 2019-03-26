//const express = require('express');
//const app = express();
const db = require(__dirname.slice(0,__dirname.length-11)+'/models/');
const datify = require('../datify.js');

module.exports={
	getMessages: function(req, res){
		console.log("The Messages");
		return db.Messages.findAll()
    		.then((messages) => res.send(messages))
    		.catch((err) => {
      		console.log('There was an error querying Messages', JSON.stringify(err))
      	return res.send(err)
    });

	},
	getMessage: function(req, res){
		console.log(req.params.messageid);
		let id=parseInt(req.params.messageid);
		return db.Messages.findByPk(id)
    		.then((message) => res.send(message))
    		.catch((err) => {
      		console.log('There was an error querying the message', JSON.stringify(err))
      	return res.send(err)
    });

	},
	postMessage: function(req, res){
  		return db.Messages.create({ "user":req.body.user, "msg":req.body.msg, "timestamp":datify.getDate(), "chatId":req.body.chatId })
    		.then((message) => res.send(message))
    		.catch((err) => {
      	console.log('***There was an error creating a Message', JSON.stringify(contact))
      return res.status(400).send(err)
    });

	},
	putMessage: function(req, res){
		console.log("Put Message "+req.params.messageid);
		const id = parseInt(req.params.messageid)
  		return db.Messages.findByPk(id)
  			.then((Message) => {
    		if(Message!==null){
    			return Message.update({ "msg":req.body.msg })
      			.then(() => res.send(Message))
      			.catch((err) => {
        			console.log('***Error updating Message', JSON.stringify(err))
        			res.status(400).send(err)
      			})}
      		else{
      			res.status(400).send("Object not Found")
      	}
  	});
	},
	deleteMessage: function(req, res){
		console.log("Delete Message "+ req.params.messageid);
		const id = parseInt(req.params.messageid)
  		return db.Messages.findByPk(id)
    		.then((Message) => Message.destroy())
    		.then(() => res.send({ Message }))
    			.catch((err) => {
      			console.log('***Error deleting Message', JSON.stringify(err))
      		res.status(400).send(err)
    });
	}
}
