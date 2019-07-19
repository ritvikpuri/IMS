import React, {Component} from 'react';
import './../App.css';
import {Form, FormGroup, FormControl, Col, Button} from 'react-bootstrap';

class SignupPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            username: '',
            password: '',
            department: '',
            error: ''
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    dismissError() {
        this.setState({error: ''});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        var upperCaseRegex=new RegExp("^(?=.*[A-Z])");
        var numberRegex=new RegExp("^(?=.*[0-9])");
        var specialCharacterRegex=new RegExp("^(?=.*[!@#\\$%\\^&])");
        if (this.state.password.length < 8) this.setState({error: 'Minimum 8 characters required in password'});
        else if (!upperCaseRegex.test(this.state.password)) this.setState({error: 'Password must contain an uppercase letter'});
        else if (!numberRegex.test(this.state.password)) this.setState({error: 'Password must contain a digit'});
        else if (!specialCharacterRegex.test(this.state.password))  this.setState({error: 'Password must contain a special character'});
        else {
            fetch('http://10.0.2.235:8080/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    empId: this.state.username,
                    password: this.state.password,
                    empName: this.state.name,
                    email: this.state.email,
                    dept: this.state.department
                })
            }).then((result) => {
                result.json().then((json) => {
                    if (json) this.setState({error: 'Signup successful! go to login'});
                    else this.setState({error: 'Employee code already exists'});
                })
            })
            this.setState({
                name: '',
                password: '',
                email: '',
                department: '',
                username: ''
            })
        }
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

    handleLogin() {
        this.props.sendDataToLogin('login');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 col-xs-12">
                        <div className="jumbotron">
                            <h1 className="text-center">Sign Up for IMS</h1>
                            <p className="lead" align="center">
                                Create your account to start requesting
                            </p>
                            <br/>
                            <Form onSubmit={this.handleSubmit}>
                                <p className="lead" align="center" font="#FF0000">
                                    {this.state.error}
                                </p>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={this.state.email}
                                                  onChange={this.handleEmailChange} required/>
                                </Form.Group>
                                <Form.Group controlId="formGroupName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" value={this.state.name}
                                                  onChange={this.handleNameChange} required/>
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password"
                                                  value={this.state.password}
                                                  onChange={this.handlePassChange} required/>
                                </Form.Group>
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Employee Id</Form.Label>
                                        <Form.Control type="text" placeholder="Enter ID" value={this.state.username}
                                                      onChange={this.handleUserChange} required/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control type="text" placeholder="Enter department"
                                                      value={this.state.department}
                                                      onChange={this.handleDepartmentChange} required/>
                                    </Col>
                                </Form.Row>
                                <br/>
                                <Form.Row>
                                    <Col align="right">
                                        <Button variant="outline-success" type="submit">Sign Up</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-warning" onClick={this.handleLogin}>Back to
                                            Login</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupPage;