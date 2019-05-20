import React from 'react';
import ReactDOM from "react-dom";
import * as d3 from "d3";
import { homedir } from 'os';

const axios = require('axios');

export default class Group extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            groupID:this.props.group
        }
    }
    componentDidMount(){
      var consulta;
      var nAdmins=0;
      axios.get('/api/groups/'+ this.state.groupID+'/users',{headers:{ 'authorization': "Bearer "+localStorage.getItem("token") }}
        ).then(function(response){
        consulta=response.data;
        }).catch(function(error){
          console.log(error);
        }).then(()=>{
              for (var i =0;i< consulta.length; i++){
                  nAdmins=nAdmins+consulta[i].isAdmin;
              }
              var width = 450
              var height = 450
              var margin = 40

      // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
      var radius = Math.min(width, height) / 2 - margin

      // append the svg object to the div called 'my_dataviz'
      var svg = d3.select("#graph")
        .append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      // Create dummy data
      var data = {Admins: nAdmins, Usrs: consulta.length-nAdmins}

      // set the color scale
      var color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeSet2);

      // Compute the position of each group on the pie:
      var pie = d3.pie()
        .value(function(d) {return d.value; })
      var data_ready = pie(d3.entries(data))
      // Now I know that group A goes from 0 degrees to x degrees and so on.

      // shape helper to build arcs:
      var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
          .attr('d', arcGenerator)
          .attr('fill', function(d){ return(color(d.data.key)) })
          .attr("stroke", "black")
          .style("stroke-width", "2px")
          .style("opacity", 0.7)

      // Now add the annotation. Use the centroid method to get the best coordinates
      svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d){ return d.data.key +" "+d.data.value})
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17)
    });
    }

    render(){
        return(
            <div id="graph">
                
            </div>
        );
    }
}