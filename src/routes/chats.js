//const express = require('express');
//const app = express();
const db = require(__dirname.slice(0,__dirname.length-11)+'/models/');

module.exports={
	getChats: function(req, res){
		console.log("The Chats");
		return db.Chats.findAll()
    		.then((chats) => res.send(chats))
    		.catch((err) => {
      		console.log('There was an error querying Chats', JSON.stringify(err))
      	return res.send(err)
    });

	},
	getChat: function(req, res){
		console.log(req.params.chatid);
		let id=parseInt(req.params.chatid);
		return db.Chats.findByPk(id)
    		.then((chat) => res.send(chat))
    		.catch((err) => {
      		console.log('There was an error querying the Chat', JSON.stringify(err))
      	return res.send(err)
    });

	},
	postChat: function(req, res){
  		return db.Chats.create({ "roomId":req.body.roomId })
    		.then((chat) => res.send(chat))
    		.catch((err) => {
      	console.log('***There was an error creating a Chat', JSON.stringify(contact))
      return res.status(400).send(err)
    });
	},

	deleteChat: function(req, res){
		console.log("Delete Chat "+ req.params.chatid);
		const id = parseInt(req.params.chatid)
  		return db.Chats.findByPk(id)
    		.then((chat) => chat.destroy())
    		.then(() => res.send({ chat }))
    			.catch((err) => {
      			console.log('***Error deleting Chat', JSON.stringify(err))
      		res.status(400).send(err)
		});
	}
}
