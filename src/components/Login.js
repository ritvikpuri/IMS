import React, {Component} from 'react';
import './../App.css';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

// import "./../../node_modules/w3-css/w3.css"
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'login'
        };
        this.getDataInLogin = this.getDataInLogin.bind(this);
    }

    getDataInLogin(val) {
        if (val === 'signup') {
            this.setState({current: 'signup'})
        }
        else if (val === 'login') {
            this.setState({current: 'login'})
        }
        else {
            this.props.sendDataToApp(val);
        }
    }

    render() {
        return (

            <div>
                <div className="split">
                    <div className="centered">
                        {this.state.current === 'login' ? <LoginPage sendDataToLogin={this.getDataInLogin}/> : false}
                        {this.state.current === 'signup' ? <SignupPage sendDataToLogin={this.getDataInLogin}/> : false}
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;