import React from 'react';
import '../css/group.css';
import UserProfile from "./UserProfile";
import User from "./user";
import ReactDOM from "react-dom";
import Whiteboard from "./whiteboard";

const axios = require('axios');

export default class Group extends React.Component {
	constructor(props){
		super(props);
		var o;
		this.state={
			"groupID":16,
			"name":'Group Users',
			"users":[],
			"rooms":[]
		}
		axios.get(`http://localhost:3001/api/groups/${this.props.groupid}`).then(function(response){
			o = response.data;
		}).catch((err)=>{
			console.log(err);
		}).then(()=>{
			this.state={
				"groupID":o.id,
				"name":o.name,
				"users":[],
				"rooms":[]
			}
			console.log(this.state);
		});

	}

	componentDidMount(){
		var consulta;
		axios.get('/api/groups/'+ this.state.groupID+'/users').then(function(response){
			console.log(response.data);
			consulta=response.data;
	    }).catch(function(error){
	      console.log(error);
	    }).then(()=>{
	    	this.setState({users:consulta});
				console.log(this.state.users);
				var list = document.getElementById("listOfUsers");
            for (var i =0;i< consulta.length; i++){
                console.log(consulta[i]);
                var li = document.createElement("li");
                var text = document.createTextNode(consulta[i].username);
                li.appendChild(text);
                list.appendChild(li);
            }
	    });

	    var consulta1;
		axios.get('/api/groups/'+ this.state.groupID+'/rooms').then(function(response){
			console.log(response.data);
			consulta1=response.data;
	    }).catch(function(error){
	      console.log(error);
	    }).then(()=>{
	    	this.setState({rooms:consulta1});
				console.log(this.state.rooms);
				var list = document.getElementById("listOfRooms");
            for (var i =0;i< consulta1.length; i++){
                console.log(consulta1[i]);
                var li = document.createElement("li");
                var text = document.createTextNode(consulta1[i].name);
                li.appendChild(text);
                list.appendChild(li);
            }
			});
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
				<div id="container">
					<div id="left">
					<h2 id="groupName">{this.state.name}</h2>
				    	<div className="lists" style={style}>
							<ul id="listOfUsers">
                                    
							</ul>
				    	</div>
				    <button>Add user</button>
				    </div>
				    <div id="right">
				    <h2>Rooms</h2>
				    	<div className="lists" style={style}>
				    		<ul id="listOfRooms">
                                    
								</ul>
				    	</div>
				    <button>Create new room</button>
				    </div>
				</div>
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
			</div>
		);
	}
}