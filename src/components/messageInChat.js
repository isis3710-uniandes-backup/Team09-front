import React from 'react';
import UserProfile from "./UserProfile";

const axios = require('axios');

export default class MessageInChat extends React.Component {
	state={
		"id":this.props.char.msgId,
		"user":this.props.char.user,
		"msg":this.props.char.msg,
	}

	render(){
		return <div>{this.renderState()}</div>
	}

	renderState(){
		return(
			<div>
				<b>{this.state.user}:</b>
				<p>{this.state.msg}</p>
			</div>
		);
	}
}