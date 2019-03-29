import React from 'react';
import '../css/group.css';
import UserProfile from "./UserProfile";

const axios = require('axios');

export default class roomInGroup extends React.Component {
	state={
		"id":this.props.char.roomId,
		"name":this.props.char.name,
		"groupId":this.props.char.groupId
	}

	render(){
		return <div>{this.renderState()}</div>
	}

	renderState(){
		return(
			<div>
				<p>{this.state.name}</p>
			</div>
		);
	}
}