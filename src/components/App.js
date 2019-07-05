import React, { Component } from 'react';
import './../App.css';
import Login from './Login';
import LoggedIn from './LoggedIn';
import Admin from './Admin';

class App extends Component {
  constructor() {
    super();
    this.state = {
      current:'login',
      user:{
        empId:'',
        password:'',
        empName:'',
        email:'',
        dept:'',
        admin:false
      }
    };
    this.getDataInApp=this.getDataInApp.bind(this);
    this.getDataInApp2=this.getDataInApp2.bind(this);

  }
   getDataInApp(val){   
      if(val==='login')return; 
     if(val.admin){
      this.setState({
      current:'Admin'
    })}
     else{
      this.setState({
      current:'loggedIn'
    })}

      this.setState({
        user:val
      })   
  }

  getDataInApp2(val){
    if(val==='login'){
      this.setState({
        current:'login'
      })
    }
  }

 render() {
    return (
      <div className="app">
        {this.state.current=== 'login'?<Login sendDataToApp={this.getDataInApp}/>:false}
        {this.state.current=== 'loggedIn'?<LoggedIn user={this.state.user} sendDataToApp={this.getDataInApp2} />:false}
        {this.state.current=== 'Admin'?<Admin user={this.state.user} sendDataToApp={this.getDataInApp2} />:false}

      </div>
      
    );
  }
  }

export default App;