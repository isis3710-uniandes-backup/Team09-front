import React from 'react';
import '../css/whiteboard.css';
import socketIOClient from "socket.io-client";
import UserProfile from "./UserProfile";
import ReactDOM from "react-dom";
import User from "./user";

const axios =require('axios');

export default class Whiteboard extends React.Component {
      constructor(props){
        super(props);
        this.state= UserProfile;
        this.handleComment=this.handleComment.bind(this);
        this.openNav=this.openNav.bind(this);
    }
    componentDidMount(){
        
            const endpoint = {
                response:false,
                endpoint:"http://localhost:3001"
            }; 
            var socket = socketIOClient(endpoint);
            var canvas = document.getElementsByClassName('whiteboard')[0];
            var colors = document.getElementsByClassName('color');
            var context = canvas.getContext('2d');
          
            var current = {
              color: 'black'
            };
            var drawing = false;
          
            canvas.addEventListener('mousedown', onMouseDown, false);
            canvas.addEventListener('mouseup', onMouseUp, false);
            canvas.addEventListener('mouseout', onMouseUp, false);
            canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
            
            //Touch support for mobile devices
            canvas.addEventListener('touchstart', onMouseDown, false);
            canvas.addEventListener('touchend', onMouseUp, false);
            canvas.addEventListener('touchcancel', onMouseUp, false);
            canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);
          
            for (var i = 0; i < colors.length; i++){
              colors[i].addEventListener('click', onColorUpdate, false);
            }
          
            socket.on('drawing', onDrawingEvent);
          
            window.addEventListener('resize', onResize, false);
            onResize();
          
          
            function drawLine(x0, y0, x1, y1, color, emit){
              context.beginPath();
              context.moveTo(x0, y0);
              context.lineTo(x1, y1);
              context.strokeStyle = color;
              context.lineWidth = 2;
              context.stroke();
              context.closePath();
          
              if (!emit) { return; }
              var w = canvas.width;
              var h = canvas.height;
          
              socket.emit('drawing', {
                x0: x0 / w,
                y0: y0 / h,
                x1: x1 / w,
                y1: y1 / h,
                color: color
              });
            }
          
            function onMouseDown(e){
              drawing = true;
              current.x = e.clientX||e.touches[0].clientX;
              current.y = e.clientY||e.touches[0].clientY;
            }
          
            function onMouseUp(e){
              if (!drawing) { return; }
              drawing = false;
              drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
            }
          
            function onMouseMove(e){
              if (!drawing) { return; }
              drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
              current.x = e.clientX||e.touches[0].clientX;
              current.y = e.clientY||e.touches[0].clientY;
            }
          
            function onColorUpdate(e){
              current.color = e.target.className.split(' ')[1];
            }
          
            // limit the number of events per second
            function throttle(callback, delay) {
              var previousCall = new Date().getTime();
              return function() {
                var time = new Date().getTime();
          
                if ((time - previousCall) >= delay) {
                  previousCall = time;
                  callback.apply(null, arguments);
                }
              };
            }
          
            function onDrawingEvent(data){
              var w = canvas.width;
              var h = canvas.height;
              drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
            }
          
            // make the canvas fill its parent
            function onResize() {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
            }
          
          ;
    }

    logOut(){
      window.location.reload();
    }

    handleProfile(){
      ReactDOM.render(<User />, document.getElementById("root"));
    }
    handleComment(event){
      event.preventDefault();
      console.log("hi");
      axios.post(`http://localhost:3001/api/comments/create/`,{
        "canvasId": 1,
        "comm": document.getElementById("commentField").value,
        "user":UserProfile.getName()
      })
    }
    openNav() {
      var ul = document.getElementById("commentList");
      var temp = this;
      var list;
      document.getElementById("mySidebar").style.width = "400px";
      document.getElementById("main").style.marginRight = "400px";
      axios.get(`http://localhost:3001/api/comments/`).then(function(response){
          list = response.data;
      }).catch((err)=>{
        console.log(err);
      }).then(()=>{
          for (var i=0;i<list.length;i++){
            var li = document.createElement("li");
            var cont = document.createElement("div");
            cont.setAttribute("className", "commentBox");
            cont.appendChild(document.createTextNode(`${list[i].user} says:`));
            cont.appendChild(document.createElement("br"));
            cont.appendChild(document.createTextNode(`${list[i].comm}`))
            li.appendChild(cont);
            ul.appendChild(li);
            var spaceLi = document.createElement("li");
            ul.appendChild(spaceLi);
          }
          var commentLi = document.createElement("li");
          var comment=document.createElement("form");
          comment.setAttribute("onSubmit", this.handleComment);
          console.log("created form");
          var inp = document.createElement("input");
          inp.setAttribute("type", "text");
          inp.setAttribute("placeholder", "Input a comment for the canvas!");
          inp.setAttribute("id", "commentField");
          comment.appendChild(inp);
          comment.appendChild(document.createElement("br"));
          var subm = document.createElement("input");
          subm.setAttribute("type", "submit");
          subm.setAttribute("value","Submit");
          comment.appendChild(subm);
          commentLi.appendChild(comment);
          ul.appendChild(commentLi);
      });
    }
    closeNav() {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginRight= "0";
    }

    goToUser(){
      ReactDOM.render(<User />, document.getElementById("root"));
    }

    logOut(){
      window.location.reload();
    }

    render() {
        return (
          <div id="main">
            <div>
                <canvas class="whiteboard"></canvas>
                <div class="colors">
                    <div class="color black"></div>
                    <div class="color red"></div>
                    <div class="color green"></div>
                    <div class="color blue"></div>
                    <div class="color yellow"></div>
                </div>
                <a href="#" class="float">
                  <i onClick={this.openNav} class="fa fa-envelope my-float"></i>
                </a>
                <div class="label-container">
                  <div class="label-text">Comments</div>
                  <i class="fa fa-play label-arrow"></i>
                </div>
                <div id="mySidebar" class="sidebar">
                  <a href="#" class="closebtn" onClick={this.closeNav}>&times;</a>
                  <ul id="commentList">

                  </ul>
                </div>
            </div>
            <nav class="navbar navbar-expand-sm bg-dark">
                        <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">LogicDrawing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" >Canvas</a>
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