//const express = require('express');
//const app = express();
const db = require(__dirname.slice(0,__dirname.length-11)+'/models/');


module.exports={
	getUsers: function(req, res){
		console.log("The users");
		return db.Users.findAll()
    		.then((users) => res.send(users))
    		.catch((err) => {
      		console.log('There was an error querying users', JSON.stringify(err))
      	return res.send(err)
    });

	},
	getUser: function(req, res){
		console.log(req.params.userid);
		let id=parseInt(req.params.userid);
		return db.Users.findByPk(id)
    		.then((user) => res.send(user))
    		.catch((err) => {
      		console.log('There was an error querying the user', JSON.stringify(err))
      	return res.send(err)
    });

	},
	getUserByName: function(req, res){
		console.log(req.params.username);
		let name=req.params.username;
		return db.Users.findAll({attributes:['userID','username','email','password'],where: {username: name}})
    		.then((user) => res.send(user))
    		.catch((err) => {
      		console.log('There was an error querying the user', JSON.stringify(err))
      	return res.send(err)
    });

	},
	postUser: function(req, res){
  		return db.Users.create({ "username":req.body.username, "email":req.body.email, "password":req.body.password })
    		.then((user) => res.send(user))
    		.catch((err) => {
      	console.log('***There was an error creating a user')
      return res.status(400).send(err)
    });

	},
	putUser: function(req, res){
		console.log("Put User "+req.params.userid);
		const id = parseInt(req.params.userid)
  		return db.Users.findByPk(id)
  			.then((user) => {
    		//const { username, email, password } = req.body
    	if(user!==null){
    	return user.update({ "username":req.body.username, "email":req.body.email, "password":req.body.password })
      		.then(() => res.send(user))
      		.catch((err) => {
        	console.log('***Error updating user', JSON.stringify(err))
        	res.status(400).send(err)
      	})}
      	else{
      		res.status(400).send("No se encuentra el objeto")
      	}
  	});
	},
	deleteUser: function(req, res){
		console.log("Delete user "+ req.params.userid);
		const id = parseInt(req.params.userid)
  		return db.Users.findByPk(id)
    		.then((user) => user.destroy())
    		.then(() => res.send({ user }))
    			.catch((err) => {
      			console.log('***Error deleting user', JSON.stringify(err))
      		res.status(400).send(err)
    });
	}
}

//app.get('/users', (req, res) => {
  //  res.send(`Hello World!`)
    //console.log("Estas aqui")
//});
