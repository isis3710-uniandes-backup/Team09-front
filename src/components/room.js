import React from 'react';
import '../css/room.css';
import socketIOClient from "socket.io-client";
import UserProfile from "./UserProfile";
import CanvasInRoom from "./canvasInRoom";
import Whiteboard from './whiteboard';
import User from './user';
import MessageInChat from "./messageInChat";
import ReactDOM from "react-dom";
import {IntlProvider, addLocaleData} from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import localeEnMessages from "../locales/en";
import localeEsMessages from "../locales/es";
import {FormattedMessage} from 'react-intl';
import Group from "./group";

addLocaleData(esLocaleData);

function lenguaSelector(){
   if (window.navigator.language.startsWith("es")) {
        return (localeEsMessages);
   }else{
        return localeEnMessages;
   }

}

const axios = require('axios');

export default class Room extends React.Component {

	constructor(props){
		super(props);
	this.state={
		"user":UserProfile.getName(),
		"roomId":this.props.roomId,
		"name":"",
		"groupId":-1,
		"canvases":[],
		"messages":[],
		"messagesNov":[],
		"message":"",
		"chatId":0
	}
}

	componentWillMount(){
		var consulta0;
		axios.get('/api/rooms/'+ this.state.roomId, {headers:{ 'authorization': "Bearer "+localStorage.getItem("token") }}
			).then(function(response){
			console.log(response.data);
			consulta0=response.data;
	    }).catch(function(error){
	      console.log(error);
	    }).then(()=>{
	    	this.setState({name:consulta0.name, groupId:consulta0.groupId});
	    	console.log(this.state.canvases);
	    });

		var consulta;
		axios.get('/api/rooms/'+ this.state.roomId+'/canvas', {headers:{ 'authorization': "Bearer "+localStorage.getItem("token") }}
			).then(function(response){
			console.log(response.data);
			consulta=response.data;
	    }).catch(function(error){
	      console.log(error);
	    }).then(()=>{
	    	this.setState({canvases:consulta});
	    	console.log(this.state.canvases);
	    });

    	var consulta1;
		axios.get('/api/rooms/'+ this.state.roomId+'/messages', {headers:{ 'authorization': "Bearer "+localStorage.getItem("token") }}
			).then(function(response){
			console.log(response.data);
			consulta1=response.data;
	    }).catch(function(error){
	      console.log(error);
	    }).then(()=>{
	    	this.setState({messages:consulta1});
	    	console.log(this.state.messages);
	    });

	    var consulta2;
		axios.get('/api/rooms/'+ this.state.roomId+'/chats', {headers:{ 'authorization': "Bearer "+localStorage.getItem("token") }}
			).then(function(response){
			console.log(response.data);
			consulta2=response.data;
	    }).catch(function(error){
	      console.log(error);
	    }).then(()=>{
	    	this.setState({chatId:consulta2[0].chatId});
	    	console.log(this.state.messages);
	    });
	}
	componentDidMount(){

		var endpoint = {
                response:false,
                endpoint:"http://localhost:3001"
        }; 

		var socket = socketIOClient(endpoint);

        socket.on('messages', data=> {
        	{
        		if (data==='hola'){
		        	console.log('conecta');
		        	socket.emit('join',this.state.roomId);
	  			}
	  			else{
	  				console.log('recibe');
	  				this.setState({ messagesNov: this.state.messagesNov.concat([data])});
		  			console.log(data);
	  			}
  			}
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
        if(this.state.message!==null&&this.state.message!==""){
		var socket = socketIOClient(endpoint);
	    var ms={id:this.state.roomId, msg:this.state.message, user:UserProfile.getName()};
	    socket.emit('new-message', ms);

	    axios.post('/api/messages/send/',{
      	user: this.state.user,
      	msg: this.state.message,
      	chatId: this.state.chatId
    	},{headers:{ 'authorization': "Bearer "+localStorage.getItem("token") }}
    	).then(function(response){
      		console.log(response);
    	}).catch(function(error){
      		console.log(error);
    	}).then(()=>{

    	});
    }
    }

	logOut(){
        window.location.reload();
     }

    goToDrawing(){
        ReactDOM.render(
        <IntlProvider locale={window.navigator.language} messages= {lenguaSelector()}>
            <Whiteboard/>
        </IntlProvider>, document.getElementById("root")
        );
    }

    goToGroup(){
        ReactDOM.render(
        <IntlProvider locale={window.navigator.language} messages= {lenguaSelector()}>
            <Group groupid={this.state.groupId}/>
        </IntlProvider>, document.getElementById("root")
        );
    }

    goToUser(){
		ReactDOM.render(
        <IntlProvider locale={window.navigator.language} messages= {lenguaSelector()}>
          <User/>
        </IntlProvider>, document.getElementById("root")
        );
	}

	render(){
		var placeholder="Write something";
		if (window.navigator.language.startsWith("es")) {
			placeholder="Escribe algo...";
		}

		var style = {
      			overflow: 'scroll',
      			height: '400px'
    		};
		return(
			<main>
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
				<div class="container">
				<h1 align="Center"><FormattedMessage id="room"/> {this.state.name} <FormattedMessage id="from"/> <a href="#" onClick={this.goToGroup.bind(this)}><FormattedMessage id="group"/></a></h1>
				
                 <div>
                    
                </div>
				<div id="container">
					<div id="left">
					<h2 id="title1"><FormattedMessage id="Canvas in the room"/></h2>
				    	<div id="lista" style={style}>
				    		{this.state.canvases.map( (e,i) => <CanvasInRoom key={i} char={e}/>)}
				    	</div>
				    </div>
				    <div id="right">
				    <h2 id="title2">Chat</h2>
				    	<div id="lista2" style={style}>
				    		{this.state.messages.map( (e,i) => <MessageInChat key={i} char={e}/>)}
				    		{this.state.messagesNov.map( (e,i) => <MessageInChat key={i} char={e}/>)}
				    	</div>
				    	<FormattedMessage id="Message"/>: <input type='text' aria-label='write'
                   			onChange={e => this.handleInputChange(e)} 
                   			defaultValue={this.state.message} placeholder={placeholder}/>
  						<button id="send" onClick={this.addMessage.bind(this)}><FormattedMessage id="Send"/></button>
  						<br/>
				    </div>
				</div>
			</div>
			</main>
		);
	}
}