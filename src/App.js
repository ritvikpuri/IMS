import React, {Component} from 'react';
import './App.css';
import {Jumbotron, Container, Nav, Navbar, Table, FormControl, Button, Form, ListGroup} from 'react-bootstrap';
import axios from 'axios';
import UpdateInventory from "./components/UpdateInventory";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeInfo: [''],
            inactiveInfo: [''],
            pendingInfo: [''],
            serialNumbers: [''],
            current: '',
            status: [''],
            timer: 0
        };
        this.handleReturn = this.handleReturn.bind(this);
        this.getItems = this.getItems.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    componentWillUnmount() {
        this.state.timer = null;
    }

    componentDidMount() {
        this.state.timer = setInterval(() => this.getItems(), 1000);
    }

    getItems() {
        fetch('http://10.0.2.235:8080/request/active', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({activeInfo: json});
            })
            .catch(error => console.log(error));
        this.setState({curState: 'fin'});

        fetch('http://10.0.2.235:8080/request/history', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({inactiveInfo: json});
            })
            .catch(error => console.log(error));
        this.setState({curState: 'fin'});


        fetch('http://10.0.2.235:8080/request/pending', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({pendingInfo: json});
            })
            .catch(error => console.log(error));
        this.setState({curState: 'fin'});

    }

    handleReject(index) {
        console.log("in reject");
        fetch('http://10.0.2.235:8080/request/reject', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.activeInfo[index])
        });
        var array = [...this.state.status];
        array[index] = array[index + 1];
        this.setState({status: array});
    }

    handleRejectAfterAccept(index) {
        console.log("in reject");
        fetch('http://10.0.2.235:8080/request/rejectAfterAccept', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.activeInfo[index])
        });
        var array = [...this.state.status];
        array[index] = array[index + 1];
        this.setState({status: array});
    }

    async handleAccept(index) {
        var tempActiveInfo = [...this.state.activeInfo];
        tempActiveInfo.forEach(function (tempInfo) {
            if (tempInfo.itemName === tempActiveInfo[index].itemName)
                tempInfo.currentQty--;
        });
        console.log(this.state.activeInfo[index.currentQty]);
        this.setState({activeInfo: tempActiveInfo});
        console.log(this.state.activeInfo[index.currentQty]);
        if (this.state.activeInfo[index].type !== 'devices') {
            var arr = [...this.state.status];
            arr[index] = 'accepted';
            this.setState({status: arr});
            console.log("in accept");
            // this.props.sendFunction(index);
            fetch('http://10.0.2.235:8080/request/accept/item', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.activeInfo[index])
            })
        } else {
            var arr = [...this.state.status];
            arr[index] = 'accepted';
            this.setState({status: arr});
            console.log(this.state.activeInfo[index]);
            const options = {
                url: "http://10.0.2.235:8080/request/accept/device",
                data: this.state.activeInfo[index],
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };
            const response = await axios.post(options.url, JSON.stringify(options.data), options);
            var sno = [...this.state.serialNumbers];
            sno[index] = response.data;
            this.setState({
                serialNumbers: sno
            })
        }
    }

    handleConfirm(index) {
        if (this.state.activeInfo[index].type !== 'devices') {
            console.log("in confirm");
            fetch('http://10.0.2.235:8080/request/confirm/item', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.activeInfo[index])
            })
        } else {
            fetch('http://10.0.2.235:8080/request/confirm/device', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.activeInfo[index])
            })
        }
        var tempStatus = [...this.state.status];
        tempStatus[index] = tempStatus[index + 1];
        this.setState({status: tempStatus});
    }

    handleReturn(index) {
        fetch('http://10.0.2.235:8080/request/returned', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.pendingInfo[index])
        });
        console.log("here", this.state.pendingInfo[index])
    }

    handleClick(val) {
        console.log(val);
        this.setState({current: val})
    }

    handleLogout(e) {
        this.props.sendDataToApp('login');
    }

    render() {
        return (
            <Container>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
                    <Nav className="mr-auto"/>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar>
                <Jumbotron fluid>
                    <div class="form-group">
                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <ListGroup>
                                    <ListGroup.Item variant="info">Requests</ListGroup.Item>
                                    <ListGroup.Item action
                                                    onClick={() => this.handleClick('active')}>New</ListGroup.Item>
                                    <ListGroup.Item action
                                                    onClick={() => this.handleClick('pending')}>Pending</ListGroup.Item>
                                    <ListGroup.Item action
                                                    onClick={() => this.handleClick('history')}>History</ListGroup.Item>
                                    <br/>
                                    <ListGroup.Item variant="info">Inventory</ListGroup.Item>
                                    <ListGroup.Item action onClick={() => this.handleClick('add')}>Add Item</ListGroup.Item>
                                    <ListGroup.Item action href="link5">Inventory List</ListGroup.Item>
                                    <br/>
                                    <ListGroup.Item variant="info">Users</ListGroup.Item>
                                    <ListGroup.Item action href="link6">User List</ListGroup.Item>
                                </ListGroup>
                            </div>
                            <div class="form-group col-md-10">
                                {this.state.current === 'add' ? <UpdateInventory/> : false}
                                {this.state.current === 'history' ? <><h1 className="H">Request History</h1><Table
                                    striped
                                    bordered
                                    hover>
                                    <thead>
                                    <tr className="TH">
                                        <th>Item Name</th>
                                        <th>Serial Number</th>
                                        <th>Employee Name</th>
                                        <th>Employee Id</th>
                                        <th>Request Date</th>
                                        <th>Accept Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.inactiveInfo.map((item, index) => {

                                        return (
                                            <tr className="TH" key={item.id}>
                                                <td className="TH2" key={item.itemName}>{item.itemName}</td>
                                                <td className="TH2" key={item.serialNumber}>{item.serialNumber}</td>
                                                <td className="TH2" key={item.empName}>{item.empName}</td>
                                                <td className="TH2" key={item.empId}>{item.empId}</td>
                                                <td className="TH2" key={item.requestDate}>{item.requestDate}</td>
                                                <td className="TH2" key={index}>{item.acceptDate}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </Table></> : false}

                                {this.state.current === 'active' ? <><h1 className="H">Active Requests</h1>
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr className="TH">
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Employee Name</th>
                                            <th>Employee Id</th>
                                            <th>Department</th>
                                            <th>Request Date</th>
                                            <th>Action</th>
                                            <th>Unavailable</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.activeInfo.map((item, index) => {

                                            return (
                                                <tr className="TH" key={item.id}>
                                                    <td className="TH2" key={item.itemName}>{item.itemName}</td>
                                                    <td className="TH2"
                                                        key={item.currentQty + 10000}>{item.currentQty}</td>
                                                    <td className="TH2" key={item.empName}>{item.empName}</td>
                                                    <td className="TH2" key={item.empId}>{item.empId}</td>
                                                    <td className="TH2" key={item.dept}>{item.dept}</td>
                                                    <td className="TH2" key={item.requestDate}>{item.requestDate}</td>
                                                    {this.state.status[index] !== 'accepted' ?
                                                        <td className="TH2" key={item.serialNumber}><Button
                                                            className="btnn"
                                                            onClick={() => this.handleAccept(index)}>accept</Button>
                                                        </td> : false}
                                                    {this.state.status[index] === 'accepted' && item.type === 'devices' ?
                                                        <td className="TH2" key={item.duration}><Button className="btnn"
                                                                                                        onClick={() => this.handleConfirm(index)}>{this.state.serialNumbers[index]}</Button>
                                                        </td> : false}
                                                    {this.state.status[index] === 'accepted' && item.type !== 'devices' ?
                                                        <td className="TH2" key={item.estimatedReturnDate}><Button
                                                            className="btnn"
                                                            onClick={() => this.handleConfirm(index)}>confirm</Button>
                                                        </td> : false}
                                                    {this.state.status[index] !== 'accepted' ?
                                                        <td className="TH2" key={index}><Button className="btnn"
                                                                                                onClick={() => this.handleReject(index)}>reject</Button>
                                                        </td> : false}
                                                    {this.state.status[index] === 'accepted' ?
                                                        <td className="TH2" key={index}><Button className="btnn"
                                                                                                onClick={() => this.handleRejectAfterAccept(index)}>reject</Button>
                                                        </td> : false}
                                                </tr>
                                            )
                                        })
                                        }
                                        </tbody>
                                    </Table></> : false}

                                {this.state.current === 'pending' ? <><h1 className="H">Pending Requests</h1><Table striped
                                                                                                                    bordered
                                                                                                                    hover>
                                    <thead>
                                    <tr className="TH">
                                        <th>Item Name</th>
                                        <th>Serial Number</th>
                                        <th>Employee Name</th>
                                        <th>Employee Id</th>
                                        <th>Accept Date</th>
                                        <th>Estimated Return Date</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.pendingInfo.map((item, index) => {

                                        return (
                                            <tr className="TH" key={item.id}>
                                                <td className="TH2" key={item.itemName}>{item.itemName}</td>
                                                <td className="TH2" key={item.serialNumber}>{item.serialNumber}</td>
                                                <td className="TH2" key={item.empName}>{item.empName}</td>
                                                <td className="TH2" key={item.empId}>{item.empId}</td>
                                                <td className="TH2" key={item.acceptDate}>{item.acceptDate}</td>
                                                <td className="TH2"
                                                    key={item.estimatedReturnDate}>{item.estimatedReturnDate}</td>
                                                <td className="TH2" key={item.index}>
                                                    <button className="btnn"
                                                            onClick={() => this.handleReturn(index)}>Returned
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </Table></> : false}
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                < /Container>
                    );
                    }
                    }

