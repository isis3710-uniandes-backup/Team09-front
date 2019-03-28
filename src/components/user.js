import React from 'react';
import '../css/user.css';
import UserProfile from "./UserProfile";
import ReactDOM from "react-dom";

const axios = require('axios');

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state.userInfo= UserProfile;
    }
    
    componentDidMount(){
        var modal = document.getElementById('modalPP');
        // When the user clicks on <span> (x), close the modal
        document.getElementsByClassName("closeOverlay")[0].onclick = function() {
            modal.style.display = "none";
        }
  
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    handleProfilePicture(event){
        event.preventDefault();
        var modal = document.getElementById('modalPP');
        modal.style.display = "block";
    }

    handleInfoUpdate(event){
        event.preventDefault();
        var modal = document.getElementById('modalInfo');
        modal.style.display = "block";
    }

    handleSubmitURL(event){
        event.preventDefault();
        axios.put(`http://localhost:3001/api/users/edit/${this.state.UserProfile.getID}`,{
            'profilePicturePath': this.state.picUrl
        })
    }

    handleSubmitInfo(event){
        event.preventDefault();
        axios.put(`http://localhost:3001/api/users/edit/${this.state.UserProfile.getID}`,{
            'username': this.state.newUser,
            'email': this.state.newEmail,
            'password': this.state.newPassword
        })
    }

    render(){
        return(
            <div>
                <div>
                    <nav class="navbar navbar-expand-sm bg-light">
                        <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">LogicDrawing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">My Groups</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">{UserProfile.getName()}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Log Out</a>
                        </li>
                        </ul>
                    </nav>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-sm profilePictureContainer">    
                            <img class="profilePicture" src={this.state.userInfo.getPictureSrc}/>
                            <button class="updateProfilePicture" onclick={this.handleProfilePicture} align="right">Update Profile Picture</button>
                            <div id="modalPP" class="modal">
                                <div class="modal-content-pic">
                                    <span class="closeOverlay">&times;</span>
                                    <form onSubmit={this.handleSubmitURL}>
                                        Insert the URL of the new image:<br/>
                                        <input type="text" name="picUrl" value={this.state.picUrl}/><br/>
                                        <input type="submit" value="Submit"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm userInfoContainer">
                            <div class="userInfo">
                                {this.state.UserProfile.getName}
                                <br/>
                                {this.state.UserProfile.getEmail}
                            </div>
                            <button class="updateUserInfo" onclick={this.handleInfoUpdate} align="right">Edit Info</button>
                            <div id="modalInfo" class="modal">
                                <div class="modal-content-info">
                                    <span class="closeOverlay">&times;</span>
                                    <form onSubmit={this.handleSubmitInfo}>
                                        Insert your new username:<br/>
                                        <input type="text" name="usern" value={this.state.newUser}/><br/>
                                        Insert your new email:<br/>
                                        <input type="text" name="email" value={this.state.newEmail}/><br/>
                                        Insert your new password:<br/>
                                        <input type="text" name="passw" value={this.state.newPassword}/><br/>
                                        <input type="submit" value="Submit"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-bg userGroups">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-bg recentDrawings">
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}