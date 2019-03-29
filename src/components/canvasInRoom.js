import React from 'react';
import '../css/group.css';
import UserProfile from "./UserProfile";

const axios = require('axios');

export default class CanvasInRoom extends React.Component {
	state={
		"id":this.props.char.canvasId,
		"name":this.props.char.name,
		"description":this.props.char.description
	}

	render(){
		return <div>{this.renderState()}</div>
	}

	renderState(){
		return(
			<div>
				<b><p>{this.state.name}</p></b>
				<p>{this.state.description}</p>
			</div>
		);
	}
}