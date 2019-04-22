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
        this.createNewGroup = this.createNewGroup.bind(this);
        this.handleGroupGo = this.handleGroupGo.bind(this);
        this.createNewGroupOverlay = this.createNewGroupOverlay.bind(this);
    }
    
    componentDidMount(){
        var modal = document.getElementById('modalPP');
        var modalGroup =document.getElementById('modalGroup');
        // When the user clicks on <span> (x), close the modal
        document.getElementsByClassName("closeOverlay")[0].onclick = function() {
            modal.style.display = "none";
        }
        document.getElementsByClassName("closeOverlay")[1].onclick=function(){
            modalGroup.style.display="none";
        }
  
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
            else if (event.target ==modalGroup){
                modalGroup.style.display="none";
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
                a.setAttribute("id", `group-${myGroups[i].groupId}`);
                a.onclick = this.handleGroupGo;
                li.appendChild(a);
                list.appendChild(li);
            }
        });

    }

    handleGroupGo(event){
        var id = event.srcElement.id.split('-')[1];
        ReactDOM.render(<Group groupid={id}/>, document.getElementById("root"))
    }

    handleEdit(event){
        event.preventDefault();
        var modal = document.getElementById('modalPP');
        modal.style.display = "block";
    }

    handleSubmitURL(event){
        event.preventDefault();
        axios.put(`http://localhost:3001/api/users/edit/${UserProfile.getID()}`,{
            'username': document.getElementById("newUsername").value,
            'email': document.getElementById("newEmail").value,
            'password': document.getElementById("newPassword").value,
            'profilePicturePath': document.getElementById("newUrl").value,
        });
    }

    logOut(){
        window.location.reload();
      }

    goToDrawing(){
        ReactDOM.render(<Whiteboard />, document.getElementById("root"));
    }
    
    createNewGroupOverlay(event){
        event.preventDefault();
        var modal = document.getElementById('modalGroup');
        modal.style.display = "block";
    }

    createNewGroup(event){
        let that =this;
        event.preventDefault();
        console.log("Passi");
        var gname =document.getElementById("gName").value;
        axios.post(`http://localhost:3001/api/groups/create`,{
            'name': gname
        }).then(function (response) {
            var lastID = response.data[1].lastID;
            axios.post('http://localhost:3001/api/groups/admins', {
                "groupId": lastID, 
                "userId": UserProfile.getID(),
            }).then(()=>{
                var list = document.getElementById("listOfGroups");
                var li = document.createElement("li");
                var a = document.createElement('a');
                a.appendChild(document.createTextNode(gname));
                a.href= "#";
                a.setAttribute("className", "groupNames")
                a.setAttribute("id", `group-${lastID}`);
                a.onclick = that.handleGroupGo.bind(lastID);
                li.appendChild(a);
                list.appendChild(li);
            }).catch(function(err){
                console.log(err);
            });
        });
        
    }

    render(){
            var profilePicture="Profile picture";
        if (window.navigator.language.startsWith("es")) {
            profilePicture="Foto de perfil";
       }
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
                            <a class="nav-link" href="#">{UserProfile.getName()}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={this.logOut}>Log Out</a>
                        </li>
                        </ul>
                </nav>
                <div class="container">
                <div class="row welcome">
                    <h1>Welcome, {this.state.getName()}</h1>
                </div>
                    <div class="row userInformation">
                        <div class="col-md profilePictureContainer">    
                            <div class="row">
                                <img class="profilePicture" alt={profilePicture} src="https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png"/>
                            </div>
                            <div class="row">
                                <button class="updateProfilePicture" onClick={this.handleEdit} align="right">Update Information</button>
                            </div>
                            <div id="modalPP" class="modal">
                                <div class="modal-content-pic">
                                    <div class="modal-header">
                                        Fill in the fields you would like to change
                                        <span align='right' class="closeOverlay">&times;</span>
                                    </div>
                                    <form onSubmit={this.handleSubmitURL}>
                                        <div class="modal-body">
                                        Insert your new username:<br/>
                                        <input aria-label="new username" type="text" name="usern" id="newUsername"/><br/>
                                        Insert your new email:<br/>
                                        <input aria-label="new email" type="text" name="email" id="newEmail"/><br/>
                                        Insert your new password:<br/>
                                        <input aria-label="new password" type="text" name="passw" id="newPassword"/><br/>
                                        Insert the URL of the new image:<br/>
                                        <input aria-label="new image URL" type="text" name="picUrl" id="newUrl"/><br/>
                                        </div>
                                    <div class="modal-footer">
                                        <input type="submit" value="Submit"/>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md userInfoContainer">
                            <div class="userInfo">
                                Username:
                                <br/>
                                {this.state.getName()}
                                <br/>
                                <br/>
                                Email:
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
                        <div class="col-bg">
                        <button id='newGroupButton' onClick={this.createNewGroupOverlay} >Create new group</button>
                                <div id="modalGroup" class="modal">
                                    <div class="modal-content-pic">
                                        <div class="modal-header">
                                            Insert the name of the new group:<br/>
                                            <span class="closeOverlay">&times;</span>
                                        </div>
                                        <form onSubmit={this.createNewGroup}>
                                            <div class="modal-body">
                                                <input id="gName" aria-label="new group name" type="text" name="groupn"/><br/>
                                            </div>
                                            <div class="modal-footer">
                                                <input type="submit" value="Submit"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-bg recentDrawings">
                            
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}