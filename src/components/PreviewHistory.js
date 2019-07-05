import React, { Component } from 'react';
import LoggedIn from './LoggedIn';
import './../App.css';


class PreviewHistory extends Component {
	constructor(props){
		super(props);
	}
	
	render(){
    return this.props.info.map((item,index) => (
       <div className="new">	
       		<p className="new1" key={item.id} >{item.itemName}  {item.empId} {item.acceptDate} </p>
        </div>
    ));
}
}
export default PreviewHistory;
