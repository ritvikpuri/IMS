import React, { Component } from 'react';
import PreviewRequests from './PreviewRequests';
import PreviewHistory from './PreviewHistory';
import UpdateInventory from './UpdateInventory';
import {Table,Button} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import './../App2.css';

class LoggedInAsAdmin extends React.Component {
  constructor(props){
  super(props);   
  this.state = {
      activeInfo:[],
      inactiveInfo:[],
      current:'active',
      status:[],
      timer:0
    }
 
  this.getItems=this.getItems.bind(this);
  this.handleAccept=this.handleAccept.bind(this);
  this.handleReject=this.handleReject.bind(this);
  this.handleConfirm=this.handleConfirm.bind(this);
  this.handleLogout=this.handleLogout.bind(this);

  }
componentWillUnmount() {
  this.state.timer = null;
}
componentDidMount(){
    this.state.timer = setInterval(()=> this.getItems(), 1000);
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
 
  handleReject(index){
    console.log("in reject");
    // this.props.sendFunction(index);
     fetch('http://10.0.2.235:8080/request/reject', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.activeInfo[index])
    })
     var array=[...this.state.status];
      array[index]=array[index+1];
      this.setState({status:array});
  }
  handleAccept(index){
    { var arr=[...this.state.status];
      arr[index]='accepted';
      this.setState({status:arr});
      this.setState({status:arr});
    console.log("in accept");
    // this.props.sendFunction(index);
     fetch('http://10.0.2.235:8080/request/accept', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.activeInfo[index])
    })
  }
  }
  handleConfirm(index){
    
    console.log("in confirm");
    // this.props.sendFunction(index);
     fetch('http://10.0.2.235:8080/request/confirm', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.activeInfo[index])
    })
     var array2=[...this.state.status];
      array2[index]=array2[index+1];
      this.setState({status:array2});
  }
handleLogout(e){
  this.props.sendDataToApp('login');
}

render() {
    return (
     <div>
        <div className="split2">
          <div className="centered2">
         
            <Paper square>
              <Tabs value={this.state.current} indicatorColor="primary" textColor="primary">
                <Tab value='active' label="Active" onClick={()=>this.setState({current:'active'})} />
                <Tab value='history' label="History" onClick={()=>this.setState({current:'history'})} />
                <Tab value='add' label="Add" onClick={()=>this.setState({current:'add'})}/>
              </Tabs>
            </Paper>
            {this.state.current==='history'?<><h1 className="H">Request History</h1><Table striped bordered hover>
              <thead >
                <tr className="TH">
                  <th>Item Name</th>
                  <th>Employee Name</th>
                  <th>Employee Id</th>
                  <th>Request Date</th>
                  <th>Accept Date</th>
                </tr>
              </thead>
              <tbody>
                 {this.state.inactiveInfo.map((item,index)=>{
                
                       return (
                  <tr className="TH" key={item.id}>
                    <td className="TH2" key={item.itemName}>{item.itemName}</td>
                    <td className="TH2" key={item.empName}>{item.empName}</td>
                    <td className="TH2" key={item.empId}>{item.empId}</td>
                    <td className="TH2" key={item.requestDate}>{item.requestDate}</td>
                    <td className="TH2" key={index}>{item.acceptDate}</td>           
                </tr>
                  )
                  })
               }
              </tbody>
            </Table></>:false}
            {this.state.current==='add'?<UpdateInventory/>:false}
            {this.state.current==='active'?<><h1 className="H">Active Requests</h1>
           <Table striped bordered hover>
              <thead >
                <tr className="TH">
                  <th>Item Name</th>
                  <th>Employee Name</th>
                  <th>Employee Id</th>
                  <th>Department</th>
                  <th>Request Date</th>
                  <th>Action</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                 {this.state.activeInfo.map((item,index)=>{
                
                       return (
                  <tr className="TH" key={item.id}>
                    <td className="TH2" key={item.itemName}>{item.itemName}</td>
                    <td className="TH2" key={item.empName}>{item.empName}</td>
                    <td className="TH2" key={item.empId}>{item.empId}</td>
                    <td className="TH2" key={item.dept}>{item.dept}</td>
                    <td className="TH2" key={item.requestDate}>{item.requestDate}</td>
                    {this.state.status[index]!=='accepted'?<td className="TH2" key={item.acceptDate}><Button className="btnn" onClick={()=>this.handleAccept(index)}>accept</Button></td>:false}
                    {this.state.status[index]==='accepted'?<td className="TH2" key={item.acceptDate}><Button className="btnn" onClick={()=>this.handleConfirm(index)}>confirm</Button></td>:false}
                    <td className="TH2" key={index}><Button className="btnn" onClick={()=>this.handleReject(index)}>reject</Button></td>
                </tr>
                  )
                  })
               }
              </tbody>
            </Table></>:false}
          </div>
        </div>
       
        <div className="logout">
          <button onClick={this.handleLogout}>log out</button>
        </div>
      </div>
    )
  }
}
export default LoggedInAsAdmin


  // <button onClick={this.handleActive}>active</button>
            // <button onClick={this.handleHistory}>history</button>
            // <button onClick={this.handleAdd}>add</button>
            //  
            // <DisabledTabs sendDataToAdmin={this.handleChange}/>