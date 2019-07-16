import React, {Component} from 'react';
import './../App.css';
import {Button} from 'react-bootstrap';


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
        this.handleSignup = this.handleSignup.bind(this);
    }

    dismissError() {
        this.setState({error: ''});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        fetch('http://10.0.2.235:8080/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                empId: this.state.username,
                password: this.state.password,
            })
        }).then((result) => {
            console.log(" the result is ", result);
            result.json().then((response) => {
                console.log(" the final response is ", response);
                if (response.status===401) {
                    console.log(result.status);
                    this.setState({error:'Incorrect Credentials'})
            }
                else{
                    this.props.sendDataToLogin(response);
                }

            })
        })
    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
            error:''
        });
    };

    handleSignup() {
        this.props.sendDataToLogin('signup');
    }

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
            error:''
        });
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 col-xs-12">
                        <div className="jumbotron">
                            <h1 className="text-center">IMS-IOMEDIA</h1>
                            <p className="lead" align="center">
                                Login Page
                            </p>
                            <br/><br/>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="form-group col-md-6" align="center">Username</div>
                                        <div className="form-group col-md-6">
                                            <input name="username" type="text" placeholder="username"
                                                   value={this.state.username} onChange={this.handleUserChange}
                                                   required/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6" align="center">Password</div>
                                        <div className="form-group col-md-6">
                                            <input name="password" type="password" placeholder="password"
                                                   value={this.state.password} onChange={this.handlePassChange}
                                                   required/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div><p className="LoginError">{this.state.error}</p></div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6" align="right">
                                            <Button type="submit" variant="outline-info">Login</Button>
                                        </div>
                                        <div className="form-group col-md-6" align="left">
                                            {/*<Button type="reset" variant="outline-dark">Clear</Button>*/}
                                            <Button variant="outline-success" onClick={this.handleSignup}>New User</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
