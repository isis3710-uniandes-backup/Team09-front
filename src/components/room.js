import React from 'react';
import '../css/room.css';
import socketIOClient from "socket.io-client";
import UserProfile from "./UserProfile";
import CanvasInRoom from "./canvasInRoom";
import Whiteboard from './whiteboard';
import User from './user';
import MessageInChat from "./messageInChat";
import ReactDOM from "react-dom";

const axios = require('axios');

export default class Room extends React.Component {

	constructor(props){
		super(props);
	this.state={
		"user":UserProfile.getName(),
		"roomId":this.props.roomId,
		"name":"Mi sala magica",
		"groupId":2,
		"canvases":[],
		"messages":[],
		"messagesNov":[],
		"message":"message",
		"chatId":0
	}
}
	componentDidMount(){

		var endpoint = {
                response:false,
                endpoint:"http://localhost:3001"
        }; 

		var socket = socketIOClient(endpoint);

        socket.on('messages', data=> {
        	{
	        	this.setState({messagesNov:data});
	  			console.log(data);
  			}
  			//render(data);
		});

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

  		//document.getElementById('lista2').innerHTML = html;
	}




	// clickHandler1 = ()=> {
	// 	axios.post('/api/messages/send/',{
 //      	user: this.state.user,
 //      	msg: this.state.message,
 //      	chatId: this.state.chatId
 //    	}).then(function(response){
 //      		console.log(response);
 //    	}).catch(function(error){
 //      		console.log(error);
 //    	}).then(()=>{
 //    		var a=this.state.messages;
 //    		a.push({user: this.state.user,msg: this.state.message,chatId: this.state.chatId})
 //      		this.setState({messages:a});
 //    	});
	// }

	handleInputChange(e) {
        this.setState( {message: e.target.value });
    }

    addMessage(){
    	var endpoint = {
                response:false,
                endpoint:"http://localhost:3001"
        }; 

		var socket = socketIOClient(endpoint);
	    var mensaje=this.state.message;
	    var ms={id:0, msg:mensaje, user:UserProfile.getName()};
	    socket.emit('new-message', ms);
    }

	logOut(){
        window.location.reload();
     }

    goToDrawing(){
        ReactDOM.render(<Whiteboard />, document.getElementById("root"));
    }

    goToUser(){
		ReactDOM.render(<User />, document.getElementById("root"));
	}

	render(){
		var style = {
      			overflow: 'scroll',
      			height: '400px'
    		};
		return(
			<div>
				<nav class="navbar navbar-expand-sm bg-dark">
                        <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">LogicDrawing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={this.goToDrawing}>Canvas</a>
                        </li>
                        <li class="nav-item">
                  			<a class="nav-link" href="#" onClick={this.goToUser}>{UserProfile.getName()}</a>
               			</li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={this.logOut}>Log Out</a>
                        </li>
                        </ul>
                    </nav>
                 <div>
                    
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
				    		{this.state.messagesNov.map( (e,i) => <MessageInChat key={i} char={e}/>)}
				    	</div>
				    	Message: <input type='text' 
                   			onChange={e => this.handleInputChange(e)} 
                   			defaultValue={this.state.message} placeholder="Write something..."/>
  						<button onClick={this.addMessage.bind(this)}>Send</button>
  						<br/>
				    </div>
				</div>

			</div>
		);
	}
}