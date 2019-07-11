import React, { Component } from 'react';
import PreviewRequests from './PreviewRequests';
import './../App.css';

class LoggedInAsAdmin extends React.Component {
  constructor(props){
  super(props);   
  this.state = {
      activeInfo:[],
      inactiveInfo:[],
      current:'active',
      timer:0
    }
 
  this.getItems=this.getItems.bind(this);
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

     


handleLogout(e){
  localStorage.clear();
  this.props.sendDataToLogin('login');
}

render() {
    return (
     <div>
        <div className="split2 left2">
          <div className="centered2">
            {this.state.current=== 'history'?<PreviewRequests info={this.state.inactiveInfo}/>:false}
          </div>
        </div>
        <div className="split2 right2">
          <div className="centered2">
            <PreviewRequests info={this.state.activeInfo} />
          </div>
        </div>
      </div>
    )
  }
}
export default LoggedInAsAdmin