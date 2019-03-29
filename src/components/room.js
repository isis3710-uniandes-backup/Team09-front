import React from 'react';
import '../css/room.css';
import socketIOClient from "socket.io-client";
import UserProfile from "./UserProfile";
import CanvasInRoom from "./canvasInRoom";
import MessageInChat from "./messageInChat";
import ReactDOM from "react-dom";

const axios = require('axios');

export default class Room extends React.Component {
	constructor(props){
		super(props);
	this.state={
		"user":"yo",
		"roomId":0,
		"name":"Mi sala magica",
		"groupId":2,
		"canvases":[],
		"messages":[],
		"message":"",
		"chatId":0
	}
}
	componentDidMount(){
		const endpoint = {
                response:false,
                endpoint:"http://localhost:3001"
            }; 
        var socket = socketIOClient(endpoint);
        socket.on('drawing', onDrawingEvent);

		var consulta;
		axios.get('/api/rooms/'+ this.state.groupId+'/canvas').then(function(response){
			console.log(response.data);
			consulta=response.data;
	    }).catch(function(error){
	      console.log(error);
	    }).then(()=>{
	    	this.setState({canvases:consulta});
	    	console.log(this.state.canvases);
	    });

    	var consulta1;
		axios.get('/api/rooms/'+ this.state.groupId+'/messages').then(function(response){
			console.log(response.data);
			consulta1=response.data;
	    }).catch(function(error){
	      console.log(error);
	    }).then(()=>{
	    	this.setState({messages:consulta1, chatId:consulta1[0].chatId});
	    	console.log(this.state.messages);
	    });

	    function render (data) {
  		var html = data.map(function(elem, index) {
    		return(`<div>
              			<strong>${elem.participante}</strong>
              			<em>${elem.resultado}</em>
            		</div>`);
  			}).join(" ");

  		document.getElementById('lista2').innerHTML = html;
	}


}

	clickHandler1 = ()=> {
		axios.post('/api/messages/send/',{
      	user: this.state.user,
      	msg: this.state.message,
      	chatId: this.state.chatId
    	}).then(function(response){
      		console.log(response);
    	}).catch(function(error){
      		console.log(error);
    	}).then(()=>{
    		var a=this.state.messages;
    		a.push({user: this.state.user,msg: this.state.message,chatId: this.state.chatId})
      		this.setState({messages:a});
    	});
	}

	render(){
		var style = {
      			overflow: 'scroll',
      			height: '400px'
    		};
		return(
			<div>
				<div id="upper">
                  
                    <button class="button" align="left">LogicDrawing</button>
                    <button class="button" align="left">My Groups</button>      

                    <button class="button" align="right">{UserProfile.getName()}</button>
                    <button class="button" align="right">Log out</button>
                  
                </div>
				<div id="container">
					<div id="left">
					<h2>Canvas in the room</h2>
				    	<div id="lista" style={style}>
				    		{this.state.canvases.map( (e,i) => <CanvasInRoom key={i} char={e}/>)}
				    	</div>
				    </div>
				    <div id="right">
				    <h2>Chat</h2>
				    	<div id="lista2" style={style}>
				    		
				    	</div>
				    	Message:<input type="text" value={this.state.message}/>
  						<button onClick={this.clickHandler}>
  							Send
  						</button>
  						<br/>
				    </div>
				</div>
			</div>
		);
	}
}