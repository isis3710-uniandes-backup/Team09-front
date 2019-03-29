import React from 'react';
import '../css/user.css';
import UserProfile from "./UserProfile";
import ReactDOM from "react-dom";
import Whiteboard from './whiteboard';
import Group from "./group";

const axios = require('axios');

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state= UserProfile;
        this.handleSubmitURL = this.handleSubmitURL.bind(this);
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
        var myGroups;
        axios.get(`http://localhost:3001/api/groups/user/${UserProfile.getID()}`).then(function(response){
            myGroups=response.data;
            console.log(myGroups);
        }).catch(function(err){
            console.log(err);
        }).then(()=>{
            var list = document.getElementById("listOfGroups");
            for (var i =0;i< myGroups.length; i++){
                console.log(myGroups[i]);
                var li = document.createElement("li");
                var a = document.createElement('a');
                a.appendChild(document.createTextNode(myGroups[i].name));
                a.href= "#";
                a.setAttribute("className", "groupNames")
                a.setAttribute("id", `group-${myGroups[i].id}`);
                a.onclick = this.handleGroupGo.bind(myGroups[i].id);
                li.appendChild(a);
                list.appendChild(li);
            }
        });

    }

    handleGroupGo(id){
        ReactDOM.render(<Group groupid={id}/>, document.getElementById("root"))
    }

    handleEdit(event){
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
        var temp = this.state;
        axios.put(`http://localhost:3001/api/users/edit/${UserProfile.getID()}`,{
            'profilePicturePath': temp.picUrl,
            'username': temp.newUser,
            'email': temp.newEmail,
            'password': temp.newPassword
        })
    }

    logOut(){
        window.location.reload();
      }

    goToDrawing(){
        ReactDOM.render(<Whiteboard />, document.getElementById("root"));
    }

    render(){
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
                            <a class="nav-link" href="#">{UserProfile.getName()}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={this.logOut}>Log Out</a>
                        </li>
                        </ul>
                    </nav>
                <div>
                    
                </div>
                <div class="container">
                    <div class="row userInformation">
                        <div class="col-md profilePictureContainer">    
                            <div class="row">
                                <img class="profilePicture" src="https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png"/>
                            </div>
                            <div class="row">
                                <button class="updateProfilePicture" onClick={this.handleEdit} align="right">Update Info</button>
                            </div>
                            <div id="modalPP" class="modal">
                                <div class="modal-content-pic">
                                    <span class="closeOverlay">&times;</span>
                                    <form onSubmit={this.handleSubmitURL}>
                                        Insert your new username:<br/>
                                        <input type="text" name="usern" value={this.state.newUser}/><br/>
                                        Insert your new email:<br/>
                                        <input type="text" name="email" value={this.state.newEmail}/><br/>
                                        Insert your new password:<br/>
                                        <input type="text" name="passw" value={this.state.newPassword}/><br/>
                                        Insert the URL of the new image:<br/>
                                        <input type="text" name="picUrl" value={this.state.picUrl}/><br/>
                                        <input type="submit" value="Submit"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md userInfoContainer">
                            <div class="userInfo">
                                {this.state.getName()}
                                <br/>
                                {this.state.getEmail()}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-bg userGroups">
                            <div class="myGroups">
                                <h2>My Groups</h2>
                                <ul id="listOfGroups">
                                    
                                </ul>
                            </div>
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