import React, { Component } from 'react';
import LoggedIn from './LoggedIn';
import './../App.css';


class Preview extends Component {
	constructor(props){
		super(props);
		this.state={
			ind:0
		}
		this.fun=this.fun.bind(this);
	}
	fun(index){
		console.log("in prev");
		this.props.sendFunction(index);
	}
	render(){
    return this.props.info.map((item,index) => (
       <div className="new">	
       		<p className="new1" key={item.id} >{item.itemName}</p>
	        <button className="delbtn" key={item.itemName} onClick={()=>this.fun(index)}>request</button>
        </div>
    ));
}
}
export default Preview;

//onClick={this.fun(index)}