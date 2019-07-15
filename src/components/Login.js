import React, { Component } from 'react';
import './../App.css';
import LoginPage from './LoginPage';

// import "./../../node_modules/w3-css/w3.css"
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current:'login'
    };
    this.getDataInLogin=this.getDataInLogin.bind(this);
  }
getDataInLogin(val){
  console.log("received in login page");
  console.log(val);
 this.props.sendDataToApp(val);
}

 render() {
    return (
      
      <div>
        <div className="split">
          <div className="centered">
            {this.state.current=== 'login'?<LoginPage sendDataToLogin={this.getDataInLogin}/>:false}

          </div>
        </div>
      </div>
      
    );
  }
  }

export default Login;