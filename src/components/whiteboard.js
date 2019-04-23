import React from 'react';
import '../css/whiteboard.css';
import socketIOClient from "socket.io-client";
import UserProfile from "./UserProfile";
import ReactDOM from "react-dom";
import User from "./user";
import ImageTracer from "imagetracerjs";
import {IntlProvider, addLocaleData} from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import localeEnMessages from "../locales/en";
import localeEsMessages from "../locales/es";
import {FormattedMessage} from 'react-intl';

addLocaleData(esLocaleData);

function lenguaSelector(){
   if (window.navigator.language.startsWith("es")) {
        return (localeEsMessages);
   }else{
        return localeEnMessages;
   }

}

const axios =require('axios');

var actionMade = false;
var optionsForDrawing = {
  "numberofcolors":64
}
var interval; 

function startSave(){
  interval = window.setInterval(()=>{
    var imData = ImageTracer.getImgdata(document.getElementsByClassName('whiteboard')[0]);
    var svgText = ImageTracer.imagedataToSVG(imData,optionsForDrawing);

    if(actionMade){
      axios.put('http://localhost:3001/api/actions/draw/'+1,{
        "canvasId": 1,
        "svgPath": svgText
      })
    }
    actionMade=false;
  }, 20000);
}

export default class Whiteboard extends React.Component {
      constructor(props){
        super(props);
        this.state= UserProfile;
        this.handleComment=this.handleComment.bind(this);
        this.openNav=this.openNav.bind(this);
    }

    componentWillMount(){
      document.body.style.background = "#FFFFFF";
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

            var paths;
            axios.get('http://localhost:3001/api/actions/1').then((response)=>{
              paths=response.data.svg;
            }).catch((err)=>{
              console.log(err);
            }).then(()=>{
                var svg64 = btoa(unescape(encodeURIComponent(paths))); 
                var b64start = 'data:image/svg+xml;base64,';
                var image64 = b64start + svg64;
                var image = new Image();
                image.src = image64;
                console.log(image);
                image.onload=()=>{
                  context.drawImage(image,0,0);
                }
              //canvg(canvas,paths);
            });

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
          
            //window.addEventListener('resize', onResize, false);
            onResize();
           startSave();
          
            function drawLine(x0, y0, x1, y1, color, emit){
              context.beginPath();
              context.moveTo(x0, y0);
              context.lineTo(x1, y1);
              context.strokeStyle = color;
              context.lineWidth = 2;
              context.stroke();
              context.closePath();

              actionMade=true;
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


    componentWillUnmount(){
      clearInterval(interval);
      document.body.style.background = "url('../img/seamless.png')";
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

    openMenu(){
      document.getElementById("menubar").style.width = "400px";
      document.getElementById("main").style.marginRight = "400px";
    }

    openNav() {
      var submit="Submit";
      var says="says";
      var inputDesc="Input a comment for the canvas!";
          if (window.navigator.language.startsWith("es")) {
              submit="Enviar";
              says="dice";
              inputDesc="!Pon un comentario para el canvas!";
         }
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
            cont.setAttribute("class", "commentBox");
            cont.appendChild(document.createTextNode(`${list[i].user} ${says}:`));
            cont.appendChild(document.createElement("br"));
            cont.appendChild(document.createTextNode(`${list[i].comm}`));
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
          inp.setAttribute("aria-label", "add comment");
          inp.setAttribute("placeholder", inputDesc);
          inp.setAttribute("id", "commentField");
          comment.appendChild(inp);
          comment.appendChild(document.createElement("br"));
          var subm = document.createElement("input");
          subm.setAttribute("type", "submit");
          subm.setAttribute("id","env");
          subm.setAttribute("value",submit);
          comment.appendChild(subm);
          commentLi.appendChild(comment);
          ul.appendChild(commentLi);
      });
    }
    closeNav() {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("menubar").style.width= "0";
      document.getElementById("main").style.marginRight= "0";
    }

    goToUser(){
      ReactDOM.render(
        <IntlProvider locale={window.navigator.language} messages= {lenguaSelector()}>
          <User/>
        </IntlProvider>, document.getElementById("root")
        );
    }

    logOut(){
      window.location.reload();
    }

    render() {
        return (
        <main>
          <div id="main">
            <div>
                <canvas class="whiteboard"></canvas>
                <div class="colors">
                    <h1>Canvas</h1>
                    <div class="color black"></div>
                    <div class="color red"></div>
                    <div class="color green"></div>
                    <div class="color blue"></div>
                    <div class="color yellow"></div>
                </div>
                <div class ="eraser"></div>
                <a href="#" aria-label="comments" class="float">
                  <i onClick={this.openNav} class="fa fa-envelope my-float"></i>
                </a>
                <div class="label-container">
                  <div class="label-text"><FormattedMessage id="Comments"/></div>
                  <i class="fa fa-play label-arrow"></i>
                </div>
                <div id="mySidebar" class="sidebar">
                  <a href="#" aria-label="menu" class="closebtn" onClick={this.closeNav}>&times;</a>
                  <ul id="commentList">

                  </ul>
                </div>
                <a href="#" aria-label="open menu" class="float2">
                  <i onClick={this.openMenu} class="fas fa-caret-left my-float"></i>
                </a>
                <div class="label-container2">
                  <div class="label-text">Menu</div>
                  <i class="fa fa-play label-arrow"></i>
                </div>
                <div id="menubar" class="sidebar">
                  <a href="#" class="closebtn" onClick={this.closeNav}>&times;</a>
                  <ul id="navlist">
                    <li class="redButtons">
                        <a class="links" href="#">LogicDrawing</a>
                    </li>
                    <li class="redButtons">
                      <a class="links" href="#" onClick={this.goToUser}>{UserProfile.getName()}</a>
                    </li>
                    <li class="redButtons">
                      <a class="links" href="#" onClick={this.logOut}>Log Out</a>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </main>
        );
    }

}