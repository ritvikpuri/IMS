import React, { Component } from 'react';
import {Table,Button} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './../App.css';

class LoggedIn extends React.Component {
  constructor(props){
  super(props);   
  this.state = {
    curState:'',
    status:[''],
    info:[],
    duration:[''],
    current:'devices',
    selectedElement:{
      empId:'',
      itemName:'',
      requestDate:'',
      acceptDate:'',
      active:false
    }
 
    }
    this.handleDuration=this.handleDuration.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
    this.handleRequest=this.handleRequest.bind(this);
    this.handleStationary = this.handleStationary.bind(this);
    this.handleDevices = this.handleDevices.bind(this);
    this.handleMedicine = this.handleMedicine.bind(this);

  }
  handleDuration(e,index){
    var arr=[...this.state.duration];
    arr[index]=e.target.value;
    this.setState({
      duration:arr
    })
  }
  componentDidMount(){
     this.setState({
      current:'devices'
    })
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
  handleStationary(){
    this.setState({
      current:'stationary'
    })
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
     this.setState({
      current:'devices'
    })
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
        this.setState({
      current:'medicine'
    })
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
  console.log(this.state.duration[index]);
  fetch('http://10.0.2.235:8080/request', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    empId:this.props.user.empId,
    empName:this.props.user.empName,
    dept:this.props.user.dept,
    itemName:this.state.info[index].itemName,
    type:this.state.current,
    active:false,
    duration:this.state.duration[index],
    pending:false
  })
})
  if(this.state.current==='devices'){
  var a=[...this.state.status];
  a[index]='requested';
  this.setState({
    status:a
  })
  }
}
handleLogout(e){
  this.props.sendDataToApp('login');
}

render() {
    return (
      <div>
         <Paper square>
            <Tabs value={this.state.current} indicatorColor="primary" textColor="primary">
              <Tab value='devices' label="Devices" onClick={this.handleDevices} />
              <Tab value='medicine' label="Medicine" onClick={this.handleMedicine} />
              <Tab value='stationary' label="Stationary" onClick={this.handleStationary}/>
            </Tabs>
          </Paper>
       
        {this.state.current!=='devices'?<><Table striped bordered hover>
                  <thead >
                    <tr className="TH">
                       <th>item name</th>
                        <th>send request</th>
                    </tr>
                  </thead>
                  <tbody>
                     {this.state.info.map((item,index)=>{
                    
                           return (
                      <tr className="TH" key={item.id}>
                        <td className="TH" key={item.itemName}>{item.itemName}</td>
                        <td className="TH" key={index}>
                        <Button className="btnn" onClick={()=>this.handleRequest(index)}>request</Button></td>
                    </tr>
                      )
                      })
                   }
                  </tbody>
                </Table></>:false}

                {this.state.current==='devices'?<><Table striped bordered hover>
                  <thead >
                    <tr className="TH3">
                       <th>item name</th>
                        <th>duration</th>
                        <th>send request</th>
                       
                    </tr>
                  </thead>
                  <tbody>
                     {this.state.info.map((item,index)=>{
                    
                           return (
                      <tr className="TH3" key={item.id}>
                        <td className="TH3" key={item.itemName}>{item.itemName}</td>
                        <td className="TH3">{this.state.status[index]!=='requested'?<input className="TH3" type="text" value={this.state.duration[index]} onChange={(e)=>this.handleDuration(e,index)} required />:false}</td>
                        <td className="TH3" key={index}>
                        {this.state.status[index]!=='requested'?<Button className="btnn" onClick={()=>this.handleRequest(index)}>request</Button>:false}
                        {this.state.status[index]==='requested'?<p className="TH2">requested</p>:false}
                       </td>
                    </tr>
                      )
                      })
                   }
                  </tbody>
                </Table></>:false}
        <div className="logout">
          <button onClick={this.handleLogout}>log out</button>
        </div>
      </div>
    )
  }
}
export default LoggedIn
 // <button className="ButtonUser" onClick={this.handleStationary}>stationary</button>
 //        <button className="ButtonUser" onClick={this.handleDevices}>devices</button>
 //        <button className="ButtonUser" onClick={this.handleMedicine}>medicine</button>