//const express = require('express');
//const app = express();
const db = require(__dirname.slice(0,__dirname.length-11)+'/models/');


module.exports={
	getCanvas: function(req, res){
		console.log("The canvas");
		return db.Canvases.findAll()
    		.then((canvas) => res.send(canvas))
    		.catch((err) => {
      		console.log('There was an error querying users', JSON.stringify(err))
      	return res.send(err)
    });

	},
	getCanva: function(req, res){
		console.log(req.params.id);
		let id=parseInt(req.params.id);
		return db.Canvases.findByPk(id)
    		.then((canva) => res.send(canva))
    		.catch((err) => {
      		console.log('There was an error querying the canvas', JSON.stringify(err))
      	return res.send(err)
    });

	},
	postCanvas: function(req, res){
  		return db.Canvases.create({ "name":req.body.name, "description":req.body.description, "roomId":req.body.roomId })
    		.then((canvas) => res.send(canvas))
    		.catch((err) => {
      	console.log('***There was an error creating a canvas', JSON.stringify(err))
      return res.status(400).send(err)
    });

	},
	putCanvas: function(req, res){
		console.log("Put Canvas "+req.params.id);
		const id = parseInt(req.params.id)
  		return db.Canvases.findByPk(id)
  			.then((canvas) => {
    		//const { username, email, password } = req.body
    	if(canvas!==null){
    	return canvas.update({ "name":req.body.name, "description":req.body.description, "roomId":req.body.roomId })
      		.then(() => res.send(canvas))
      		.catch((err) => {
        	console.log('***Error updating user', JSON.stringify(err))
        	res.status(400).send(err)
      	})}
      	else{
      		res.status(400).send("No se encuentra el objeto")
      	}
  	});
	},
	deleteCanvas: function(req, res){
		console.log("Delete canvas "+ req.params.id);
		const id = parseInt(req.params.id)
  		return db.Canvases.findByPk(id)
    		.then((canvas) => canvas.destroy())
    		.then(() => res.send(canvas))
    			.catch((err) => {
      			console.log('***Error deleting user', JSON.stringify(err))
      		res.status(400).send(err)
    });
	}
}