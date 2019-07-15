import React, {Component} from 'react';
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
                if (response.empId !== '0') {
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

    handleSignup() {
        this.props.sendDataToLogin('signup');
    }

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value
        });
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 col-xs-12">
                        <div className="jumbotron">
                            <h1 className="text-center">Login Page</h1>
                            <p className="lead" align="center">
                                Come INVENTORY with us <i className="fa fa-plane"></i>
                            </p>
                            <br/>
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group" align="center">
                                    <div class="form-row">
                                        <div className="form-group col-md-3">Username</div>
                                        <div className="form-group col-md-6">
                                        <input name="username" type="text" placeholder="Username"
                                               value={this.state.username} onChange={this.handleUserChange}
                                               required/>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div className="form-group col-md-3">Password</div>
                                        <div className="form-group col-md-6">
                                            <input name="password" type="password"
                                                   placeholder="Password" value={this.state.password}
                                                   onChange={this.handlePassChange} required/>
                                        </div>
                                    </div>
                                    <br/><br/>
                                    <div align="center">
                                        <button type="submit" className="btn btn-outline-info">Login</button>
                                        <button type="reset" className="btn btn-outline-dark">Close</button>
                                    </div>
                                    <br/>
                                    <div>
                                        <button type="outline-success" onClick={this.handleSignup}>New flyer?</button>
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


{/*<form onSubmit={this.handleSubmit}>*/
}

{/*  {*/
}
{/*    this.state.error &&*/
}
{/*    <h3 data-test="error" onClick={this.dismissError}>*/
}
{/*      <button onClick={this.dismissError}>✖</button>*/
}
{/*      {this.state.error}*/
}
{/*    </h3>*/
}
{/*  }*/
}

{/*  <label className="LoginLabel">Employee Id</label>*/
}
{/*  <input className="LoginInput" ref="input" type="text" data-test="username"  value={this.state.username} onChange={this.handleUserChange} required />*/
}
{/*  <br/>*/
}
{/*  <br/>*/
}
{/*  <br/>*/
}
{/*  <label className="LoginLabel">password</label>*/
}
{/*  <input className="LoginInput" type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} required />*/
}
{/*  <br/>*/
}
{/*  <br/>*/
}
{/*  <br/>*/
}
{/*  <input className="LoginSubmit" type="submit" value="Log In" data-test="submit" />*/
}

{/*</form>*/
}
{/*          //*/
}