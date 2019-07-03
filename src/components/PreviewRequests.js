import React, { Component } from 'react';
import LoggedIn from './LoggedIn';
import './../App.css';


class PreviewRequests extends Component {
	constructor(props){
		super(props);
		this.state={
			current:['']
		}
		this.accept=this.accept.bind(this);
		this.confirm=this.confirm.bind(this);
		this.reject=this.reject.bind(this);
	}
	reject(index){
		console.log("in reject");
		// this.props.sendFunction(index);
		 fetch('http://10.0.2.235:8080/request/reject', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.info[index])
    })
		 var array=[...this.state.current];
      array[index]=array[index+1];
      this.setState({current:array});
	}
	accept(index){
		{	var arr=[...this.state.current];
			arr[index]='accepted';

			this.setState({current:arr});
		console.log("in accept");
		// this.props.sendFunction(index);
		 fetch('http://10.0.2.235:8080/request/accept', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.info[index])
    })
	}
	}
	confirm(index){
		
		console.log("in confirm");
		// this.props.sendFunction(index);
		 fetch('http://10.0.2.235:8080/request/confirm', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.info[index])
    })
	}
	render(){
    return this.props.info.map((item,index) => (
       <div className="new">	
       		<p className="new1" key={item.id} >{item.itemName}<span>  </span>{item.empName} </p>
	        {this.state.current[index]==='accepted'?
	        	(<><p key={index}>mail sent</p><button className="delbtn" key={item.itemName} onClick={()=>this.confirm(index)}>confirm</button></>)
	        	:
	        	(
	        	<>
	        		<button className="delbtn" key={item.empName} onClick={()=>this.reject(index)}>reject</button>
	        		<button className="delbtn" key={item.empId} onClick={()=>this.accept(index)}>accept</button>
	        	</>
	        	)

	    	}
	    	
        </div>
    ));
}
}
export default PreviewRequests;
