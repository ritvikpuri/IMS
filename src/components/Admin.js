import React, { Component } from 'react';
import PreviewRequests from './PreviewRequests';
import PreviewHistory from './PreviewHistory';
import UpdateInventory from './UpdateInventory';

import './../App2.css';

class LoggedInAsAdmin extends React.Component {
  constructor(props){
  super(props);   
  this.state = {
      activeInfo:[],
      inactiveInfo:[],
      current:'history',
      timer:0
    }
 
  this.getItems=this.getItems.bind(this);
  this.handleSwitch=this.handleSwitch.bind(this);

  }
componentWillUnmount() {
  this.state.timer = null;
}
componentDidMount(){
    this.timer = setInterval(()=> this.getItems(), 1000);
  }
getItems(){  
   fetch('http://10.0.2.235:8080/request/active', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({activeInfo:json});
    })
    .catch(error => console.log(error));
      this.setState({curState:'fin'});



       fetch('http://10.0.2.235:8080/request/history', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({inactiveInfo:json});
    })
    .catch(error => console.log(error));
      this.setState({curState:'fin'});
  }
  handleSwitch(){
   if(this.state.current==='history'){
     this.setState({
      current:'form'
    })
   }
   else{
     this.setState({
      current:'history'
    })
   }
  }
handleLogout(e){
  localStorage.clear();
  this.props.sendDataToLogin('login');
}

render() {
    return (
     <div>
        <div className="split2 left2">
          <div className="centered2">
            <button onClick={this.handleSwitch}>switch</button>
             <h1 className="H">Request History</h1>
            {this.state.current==='history'?<PreviewHistory info={this.state.inactiveInfo}/>:false}
            {this.state.current==='form'?<UpdateInventory/>:false}
          </div>
        </div>
        <div className="split2 right2">
          <div className="centered2">
            <h1 className="H">Active Requests</h1>
            <PreviewRequests info={this.state.activeInfo} />
          </div>
        </div>
      </div>
    )
  }
}
export default LoggedInAsAdmin


 