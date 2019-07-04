import React, { Component } from 'react';
import './../App.css';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {

  
    
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
       console.log("above t");

 fetch('http://10.0.2.235:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        empId:this.state.username,
        password:this.state.password,
      })
    }).then((result)=>{
      console.log(" the result is ",result);
      result.json().then((response)=>{
        console.log(" the final response is ",response);
          if(response.empId!=='0'){
            this.props.sendDataToLogin(response); 
          }
          
      })
    })
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  render() {
    
    return (
     
          <form onSubmit={this.handleSubmit}>
          
            {
              this.state.error &&
              <h3 data-test="error" onClick={this.dismissError}>
                <button onClick={this.dismissError}>✖</button>
                {this.state.error}
              </h3>
            }

            <label className="LoginLabel">Employee Id</label>
            <input className="LoginInput" ref="input" type="text" data-test="username"  value={this.state.username} onChange={this.handleUserChange} required />
           <br/>
            <br/>
            <br/>
            <label className="LoginLabel">password</label>
            <input className="LoginInput" type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} required />
            <br/>
            <br/>
            <br/>
            <input className="LoginSubmit" type="submit" value="Log In" data-test="submit" />
            
          </form>   
          
          
    );
  }
}

export default LoginPage;