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

		this.handleCreateNewUser=this.handleCreateNewUser.bind(this);
		this.handleCreateNewRoom=this.handleCreateNewRoom.bind(this);
		this.handleOverlayUser=this.handleOverlayUser.bind(this);
		this.handleOverlayRoom=this.handleOverlayRoom.bind(this);
	}

	componentDidMount(){
		var modal = document.getElementById('modalUsers');
		var modal2=document.getElementById('modalRooms');
        // When the user clicks on <span> (x), close the modal
        document.getElementsByClassName("closeOverlay")[0].onclick = function() {
						modal.style.display = "none";
				}
				document.getElementsByClassName("closeOverlay")[1].onclick=function(){
					modal2.style.display = "none";
				}
  
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
						}
						else if(event.target ==modal2){
							modal2.style.display ="none";
						}
        }
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

	handleOverlayUser(event){
		event.preventDefault();
		var modal = document.getElementById('modalUsers');
		modal.style.display = "block";
	}	

	handleOverlayRoom(event){
		event.preventDefault();
		var modal = document.getElementById('modalRooms');
		modal.style.display = "block";
	}

	handleCreateNewUser(event){
		event.preventDefault();
		var temp = this.state;
		var usn= document.getElementById("usernameField").value;
		var userId;
		axios.get(`http://localhost:3001/api/users/name/${usn}`).then(function(response){
				userId = response.data[0].userID;
		}).catch((err)=>{
			console.log(err);
		}).then(()=>{
			if(document.getElementById("isAdmin").checked){
				console.log(userId);
				axios.post(`http://localhost:3001/api/groups/admins`,{
					'groupId': temp.groupID,
					'userId': userId
				})
				alert(`The user ${usn} was set as admin!`)
			}
			else{
				axios.post(`http://localhost:3001/api/groups/users`,{
					'groupId': temp.groupID,
					'userId': userId
				})
				alert(`The user ${usn} was set as a member of the group`)
			}
			
		});
}

handleCreateNewRoom(event){
	event.preventDefault();
	var temp =this.state;
	var roomname = document.getElementById("roomnameField").value;
	axios.post(`http://localhost:3001/api/rooms/create`,{
		"name":roomname,
		"groupId":temp.groupID
	})
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
				    <button onClick={this.handleOverlayUser}>Add user to Group</button>
						<div id="modalUsers" class="modal">
                <div class="modal-content-pic">
                	<span class="closeOverlay">&times;</span>
                  <form onSubmit={this.handleCreateNewUser}>
                  	Insert your the username of the user:<br/>
                    <input type="text" name="usern" id="usernameField"/><br/>
										Will the user be admin? <br/>
										<input id="isAdmin" type="checkbox" name="admin"/><br/>
                    <input type="submit" value="Submit"/>
                  </form>
               	</div>
              </div>
				    </div>
				    <div id="right">
				    <h2>Rooms</h2>
				    	<div className="lists" style={style}>
				    		<ul id="listOfRooms">
                                    
								</ul>
				    	</div>
							<button onClick={this.handleOverlayRoom}>Add user to Group</button>
							<div id="modalRooms" class="modal">
									<div class="modal-content-pic">
										<span class="closeOverlay">&times;</span>
										<form onSubmit={this.handleCreateNewRoom}>
											Insert the name of the room:<br/>
											<input type="text" name="roomn" id="roomnameField"/><br/>
											<input type="submit" value="Submit"/>
										</form>
									</div>
								</div>
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