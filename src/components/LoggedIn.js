import React, {Component} from 'react';
import {Table, Button, Jumbotron, Container} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './../App.css';

class LoggedIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curState: '',
            info: [''],
            hours: [''],
            minutes: [''],
            current: 'devices',
            selectedElement: {
                empId: '',
                itemName: '',
                requestDate: '',
                acceptDate: '',
                active: false
            },
            error: ['']
        }
        this.handleHours = this.handleHours.bind(this);
        this.handleMinutes = this.handleMinutes.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.handleStationary = this.handleStationary.bind(this);
        this.handleDevices = this.handleDevices.bind(this);
        this.handleMedicine = this.handleMedicine.bind(this);

    }

    handleHours(e, index) {
        var arr = [...this.state.hours];
        arr[index] = e.target.value;
        this.setState({
            hours: arr
        })
    }

    handleMinutes(e, index) {
        var arr = [...this.state.minutes];
        arr[index] = e.target.value;
        this.setState({
            minutes: arr
        })
    }

    componentDidMount() {
        this.setState({
            current: 'devices'
        })
        fetch('http://10.0.2.235:8080/inventory/devices', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({info: json});
            })
            .catch(error => console.log(error));
        this.setState({curState: 'fin'});

    }

    handleStationary() {
        this.setState({error: ['']});
        this.setState({
            current: 'stationary'
        })
        fetch('http://10.0.2.235:8080/inventory/stationary', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({info: json});
            })
            .catch(error => console.log(error));
        this.setState({curState: 'fin'});
    }

    handleDevices() {
        this.setState({error: ['']});
        this.setState({
            current: 'devices'
        })
        fetch('http://10.0.2.235:8080/inventory/devices', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({info: json});
            })
            .catch(error => console.log(error));
        this.setState({curState: 'fin'});
    }

    handleMedicine() {
        this.setState({error: ['']});
        this.setState({
            current: 'medicine'
        })
        fetch('http://10.0.2.235:8080/inventory/medicine', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({info: json});
            })
            .catch(error => console.log(error));
        this.setState({curState: 'fin'});
    }


    handleRequest(index) {
        if ((((this.state.minutes[index] >= 0 && this.state.hours[index] > 0) || (this.state.minutes[index] > 0 && this.state.hours[index] >= 0))
            && this.state.current === 'devices' && this.state.hours[index]!=='' && this.state.minutes[index]!=='') || this.state.current !== 'devices') {
            fetch('http://10.0.2.235:8080/request', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    empId: this.props.user.empId,
                    empName: this.props.user.empName,
                    dept: this.props.user.dept,
                    itemName: this.state.info[index].itemName,
                    type: this.state.current,
                    active: false,
                    hours: this.state.hours[index],
                    minutes: this.state.minutes[index],
                    pending: false
                })
            })
            console.log(this.state.minutes[index]);
            console.log(this.state.hours[index]);
            var successMessage = [...this.state.error];
            successMessage[index] = 'Request Sent';
            this.setState({error: successMessage});
        } else {
            var tempError = [...this.state.error];
            tempError[index] = 'field cannot be empty'
            this.setState({error: tempError});
        }

        var arr=[...this.state.hours];
        arr[index]='';
        this.setState({hours:arr});
        var arr=[...this.state.minutes];
        arr[index]='';
        this.setState({minutes:arr});


    }

    handleLogout(e) {
        this.props.sendDataToApp('login');
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h3 className="display-4" align="center">Welcome to IMS</h3>
                    <p className="lead" align="center">What would you like to request?</p>
                    <div align="right">
                        <Button variant="outline-warning" onClick={this.handleLogout} align="right">Log Out</Button>
                    </div>
                    <br/>
                    <div>
                        <Paper square>
                            <Tabs value={this.state.current} indicatorColor="primary" textColor="primary">
                                <Tab value='devices' label="Devices" onClick={this.handleDevices}/>
                                <Tab value='medicine' label="Medicine" onClick={this.handleMedicine}/>
                                <Tab value='stationary' label="Stationary" onClick={this.handleStationary}/>
                            </Tabs>
                        </Paper>

                        {this.state.current !== 'devices' ? <><Table striped bordered hover>
                            <thead>
                            <tr className="TH">
                                <th>Item Name</th>
                                <th>Send Request</th>
                                <th>Request Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.info.map((item, index) => {

                                return (
                                    <tr className="TH" key={item.id}>
                                        <td className="TH" key={item.itemName}>{item.itemName}</td>
                                        <td className="TH" key={index}>
                                            <Button variant="outline-primary"
                                                    onClick={() => this.handleRequest(index)}>Request</Button></td>
                                        <td>{this.state.error[index]}</td>
                                    </tr>
                                )
                            })
                            }
                            </tbody>
                        </Table></> : false}

                        {this.state.current === 'devices' ? <><Table striped bordered hover>
                                <thead>
                                <tr className="TH3">
                                    <th>Item Name</th>
                                    <th>Duration(Hrs:Mins)</th>
                                    <th>Send Request</th>
                                    <th>Request Status</th>

                                </tr>
                                </thead>
                                <tbody>
                                {this.state.info.map((item, index) => {

                                    return (
                                        <tr className="TH3" key={item.id}>
                                            <td className="TH3" key={item.itemName}>{item.itemName}</td>
                                            <td className="TH3"><input type="number" min="0" max="10" required={true}
                                                                       value={this.state.hours[index]}
                                                                       onChange={(e) => this.handleHours(e, index)}
                                                                       required/>
                                                <span> : </span>
                                                <input type="number" min="0" max="59" required={true}
                                                       value={this.state.minutes[index]}
                                                       onChange={(e) => this.handleMinutes(e, index)} required
                                                />
                                            </td>
                                            <td className="TH3" key={index}>
                                                <Button variant="outline-primary"
                                                        onClick={() => this.handleRequest(index)}>Request</Button>

                                            </td>
                                            <td>{this.state.error[index]}</td>
                                        </tr>
                                    )
                                })
                                }
                                </tbody>
                            </Table></ >
                            :
                            false
                        }
                    </div>
                </Jumbotron>
                < /Container>
                    )
                    }
                    }
                    export default LoggedIn;