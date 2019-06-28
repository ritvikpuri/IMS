import React, { Component } from 'react';
import './../App.css';
import LoginPage from './LoginPage';

class LoggedIn extends React.Component {
  constructor(props){
  super(props);   
  this.state = {
    curState:'init',
    empName:'',
    empId:'',
    itemName:'',
    time:'',
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleFinalSubmit=this.handleFinalSubmit.bind(this);
  }

  onMount(){
///get array if option selected,

  }

handleRequest(e){
  /////submit to db
  this.props.sendDataToApp('login');
  localStorage.setItem(this.state.formName,JSON.stringify(this.state.fields));
  console.log("in finalSubmit");      
}

handleLogout(e){
  localStorage.clear();
  this.props.sendDataToApp('login');
}

render() {
    return (
      <div>
        <h1 className="H">{this.state.formName}</h1>
        this.state.fields.map((item,index) => (
       <div>  
          <p className="abc2" key={item.label} >{item.label}</p>
          <input className="abc3" type="text" value={this.state.value} onChange={(e)=>this.handleChange(index,e)}/>
          <br/>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
        <br/>
        <div>
          <button className="btn1" onClick={this.handleFinalSubmit } >submit</button>
      </div>
        <div className="logout">
          <button onClick={this.handleLogout}><i class="fa fa-sign-out" aria-hidden="true"></i></button>
        </div>
      </div>
    )
  }
}
export default LoggedIn