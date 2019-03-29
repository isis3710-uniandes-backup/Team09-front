import React from 'react';
import '../css/group.css';
import UserProfile from "./UserProfile";
import UserInGroup from "./userInGroup";
import RoomInGroup from "./roomInGroup";

const axios = require('axios');

export default class Group extends React.Component {

	state={
		"groupID":30,
		"name":'Ohaio',
		"users":[],
		"rooms":[]
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
	    });
	}

	render(){
		var text=this.state.name+"' users";
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
					<h2>{text}</h2>
				    	<div id="lista" style={style}>
				    		{this.state.users.map( (e,i) => <UserInGroup key={i} char={e}/>)}
				    	</div>
				    <button>Add user</button>
				    </div>
				    <div id="right">
				    <h2>Rooms</h2>
				    	<div id="lista2" style={style}>
				    		{this.state.rooms.map( (e,i) => <RoomInGroup key={i} char={e}/>)}
				    	</div>
				    <button>Create new room</button>
				    </div>
				</div>
			</div>
		);
	}
}