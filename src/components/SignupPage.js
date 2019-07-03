import React, { Component } from 'react';
import './../App.css';

class SignupPage extends Component {
  constructor() {
    super();
    this.state = {
      email:'Email',
      name:'Name',
      username: 'Employee Id',
      password: 'Password',
      department:'Department',
      error: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
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
   
fetch('http://10.0.2.235:8080/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        empId:this.state.username,
        password:this.state.password,
        empName:this.state.name,
        email:this.state.email,
        dept:this.state.department
      })
    }).then((result)=>{
      console.log(" the result is ",result);
      result.json().then((response)=>{
        console.log(" the final response is ",response);
         if(response){
            
    }
      })
    })
  }
   handleEmailChange(evt) {
    this.setState({
      email: evt.target.value,
    });
  };
    handleNameChange(evt) {
    this.setState({
      name: evt.target.value,
    });
  };
     handleDepartmentChange(evt) {
    this.setState({
      department: evt.target.value,
    });
  };

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    return (
     
          <form onSubmit={this.handleSubmit}>
            {
              this.state.error &&
              <h3 data-test="error" onClick={this.dismissError}>
                <button onClick={this.dismissError}>✖</button>
                {this.state.error}
              </h3>
            }
           
            <input type="text" data-test="email" value={this.state.email} onChange={this.handleEmailChange} onClick={()=>this.setState({email:''})} required />
            <br/>
           
            <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} onClick={()=>this.setState({username:''})} required/>
            <br/>
            <input type="text" data-test="name" value={this.state.name} onChange={this.handleNameChange} onClick={()=>this.setState({name:''})} required />
            <br/>
            <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} onClick={()=>this.setState({password:''})} required />
            <br/>

            <input type="text" data-test="department" value={this.state.department} onChange={this.handleDepartmentChange} onClick={()=>this.setState({department:''})} required />
            <br/>

            <input type="submit" value="Create Account" data-test="submit" />
          </form>       
    );
  }
}

export default SignupPage;