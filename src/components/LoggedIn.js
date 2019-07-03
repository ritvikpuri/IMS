import React, { Component } from 'react';
import Preview from './Preview';
import './../App.css';

class LoggedIn extends React.Component {
  constructor(props){
  super(props);   
  this.state = {
    curState:'init',
    info:[],
    selectedElement:{
      empId:'',
      itemName:'',
      requestDate:'',
      acceptDate:'',
      active:false
    }
 
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRequest=this.handleRequest.bind(this);
    this.handleStationary = this.handleStationary.bind(this);
    this.handleDevices = this.handleDevices.bind(this);
    this.handleMedicine = this.handleMedicine.bind(this);
  
  }

  handleStationary(){
  
   fetch('http://10.0.2.235:8080/inventory/stationary', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({info:json});
    })
    .catch(error => console.log(error));
      this.setState({curState:'fin'});
  }

  handleDevices(){
  
   fetch('http://10.0.2.235:8080/inventory/devices', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({info:json});
    })
    .catch(error => console.log(error));
      this.setState({curState:'fin'});
  }
    handleMedicine(){
     
fetch('http://10.0.2.235:8080/inventory/medicine', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({info:json});
    })
    .catch(error => console.log(error));
     this.setState({curState:'fin'});
  }


handleRequest(index){
  console.log("element=",this.state.info[index].itemName);
  console.log('in req',this.props.user.empId);
fetch('http://10.0.2.235:8080/request', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    empId:this.props.user.empId,
    empName:this.props.user.empName,
    itemName:this.state.info[index].itemName,
    active:false
  })
})
}
handleLogout(e){
  localStorage.clear();
  this.props.sendDataToLogin('login');
}

render() {
    return (
      <div>

        <button className="ButtonUser" onClick={this.handleStationary}>stationary</button>
        <button className="ButtonUser" onClick={this.handleDevices}>devices</button>
        <button className="ButtonUser" onClick={this.handleMedicine}>medicine</button>

        {this.state.curState!='init'?<Preview info={this.state.info} sendFunction={this.handleRequest}/>:false}

        <div className="logout">
          <button onClick={this.handleLogout}>log out</button>
        </div>
      </div>
    )
  }
}
export default LoggedIn