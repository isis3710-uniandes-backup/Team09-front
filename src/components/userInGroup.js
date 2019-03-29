import React from 'react';
import '../css/group.css';
import UserProfile from "./UserProfile";

const axios = require('axios');

export default class userInGroup extends React.Component {
	state={
		"id":this.props.char.userId,
		"username":this.props.char.username,
		"isAdmin":this.props.char.isAdmin
	}

	render(){
		return <div>{this.renderState()}</div>
	}

	renderState(){
		return(
			<div>
				<p>{this.state.username}</p>
			</div>
		);
	}
}