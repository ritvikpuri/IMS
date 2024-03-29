import React, {Component} from 'react';
import {Jumbotron, Container, Badge, Nav, Navbar, Table, FormControl, Button, Form, ListGroup} from 'react-bootstrap';
import axios from 'axios';
import UpdateInventory from "./UpdateInventory";
import 'font-awesome/css/font-awesome.min.css';
import './../App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeInfo: [],
            inactiveInfo: [''],
            pendingInfo: [],
            invtInfo: [''],
            users: [''],
            serialNumbers: [''],
            current: 'dash',
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
        this.setState({timer: null})
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

        fetch('http://10.0.2.235:8080/inventory', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({invtInfo: json});
            })
            .catch(error => console.log(error));
        this.setState({curState: 'fin'});

        fetch('http://10.0.2.235:8080/userlist', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({users: json});
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
        array.splice(index, 1);
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
        array.splice(index, 1);
        this.setState({status: array});

        var tempSno = [...this.state.serialNumbers];
        tempSno.splice(index, 1);
        this.setState({serialNumbers: tempSno});
    }

    async handleAccept(index) {
        if (this.state.activeInfo[index].type !== 'devices') {
            var arr = [...this.state.status];
            arr[index] = 'accepted';
            this.setState({status: arr});
            console.log("in accept");
            fetch('http://10.0.2.235:8080/request/accept/item', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.activeInfo[index])
            })
        } else {
            var tempStatus = [...this.state.status];
            tempStatus[index] = 'accepted';
            this.setState({status: tempStatus});

            const options = {
                url: "http://10.0.2.235:8080/request/accept/device",
                data: this.state.activeInfo[index],
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };
            let response = {};
            try {
                response = await axios.post(options.url, JSON.stringify(options.data), options);
                var sno = [...this.state.serialNumbers];
                sno[index] = response.data;
                this.setState({
                    serialNumbers: sno
                })
            } catch (err) {
                response = err;
                var sno = [...this.state.serialNumbers];
                sno[index] = 'UNAVAILABLE';
                this.setState({
                    serialNumbers: sno
                })

            }

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
        console.log(this.state.status);
        var tempStatus = [...this.state.status];
        tempStatus.splice(index, 1);
        this.setState({status: tempStatus});
        console.log(this.state.status);
        console.log(this.state.serialNumbers);
        var tempSno = [...this.state.serialNumbers];
        tempSno.splice(index, 1);
        this.setState({serialNumbers: tempSno});
        console.log(this.state.serialNumbers);
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
    }

    handleClick(val) {
        console.log(val);
        this.setState({current: val})
    }

    handleLogout(e) {
        this.setState({timer: null});
        this.props.sendDataToApp('login');
    }

    render() {
        return (
            <Container>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand onClick={() => this.handleClick('dash')}><i className="fa fa-home"
                                                                              aria-hidden="true"></i> Admin
                        Dashboard</Navbar.Brand>
                    <Nav className="mr-auto"/>
                    <Form inline>
                        <Button variant="danger" onClick={this.handleLogout}>Log Out <i className="fa fa-sign-out"
                                                                                        aria-hidden="true"></i></Button>
                    </Form>
                </Navbar>
                <Jumbotron>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <ListGroup>
                                    <ListGroup.Item variant="info">Requests</ListGroup.Item>
                                    <ListGroup.Item action
                                                    onClick={() => this.handleClick('active')}>New {this.state.activeInfo.length > 0 ?
                                        <Badge
                                            variant="danger"> {this.state.activeInfo.length}</Badge> : false}</ListGroup.Item>
                                    <ListGroup.Item action
                                                    onClick={() => this.handleClick('pending')}>Pending {this.state.pendingInfo.length > 0 ?
                                        <Badge
                                            variant="danger"> {this.state.pendingInfo.length}</Badge> : false}</ListGroup.Item>
                                    <ListGroup.Item action
                                                    onClick={() => this.handleClick('history')}>History</ListGroup.Item>
                                    <br/>
                                    <ListGroup.Item variant="info">Inventory</ListGroup.Item>
                                    <ListGroup.Item action onClick={() => this.handleClick('add')}>Add
                                        Item</ListGroup.Item>
                                    <ListGroup.Item action onClick={() => this.handleClick('inventory')}>Inventory
                                        List</ListGroup.Item>
                                    <br/>
                                    <ListGroup.Item variant="info">Users</ListGroup.Item>
                                    <ListGroup.Item action onClick={() => this.handleClick('users')}>User
                                        List</ListGroup.Item>
                                </ListGroup>
                            </div>
                            <div class="form-group col-md-10">
                                {this.state.current === 'add' ? <UpdateInventory/> : false}
                                {this.state.current === 'history' ? <><h1 align="center">Request History</h1><Table
                                    striped
                                    bordered
                                    hover>
                                    <thead>
                                    <tr className="TH">
                                        <th>Item Name</th>
                                        <th>Serial Number</th>
                                        <th>Employee Name</th>
                                        <th>Employee Id</th>
                                        <th>Accept Date</th>
                                        <th>Return Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.inactiveInfo.map((item, index) => {

                                        return (
                                            <tr className="TH" key={item.id}>
                                                <td className="TH2" key="a">{item.itemName}</td>
                                                <td className="TH2" key='b'>{item.serialNumber}</td>
                                                <td className="TH2" key='c'>{item.empName}</td>
                                                <td className="TH2" key='d'>{item.empId}</td>
                                                <td className="TH2" key='e'>{item.requestDate}</td>
                                                <td className="TH2" key='f'>{item.returnDate}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </Table></> : false}

                                {this.state.current === 'active' ? <><h1 align="center">Active Requests</h1>
                                    <Table hover>
                                        <thead>
                                        <tr className="TH">
                                            <th>Item Name</th>
                                            <th>Employee Name</th>
                                            <th>Employee Id</th>
                                            <th>Department</th>
                                            <th>Request Date</th>
                                            <th>Action</th>
                                            <th>Assigned Serial Number</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.activeInfo.map((item, index) => {

                                            return (
                                                <tr className="TH" key={item.id}>
                                                    <td className="TH2" key='a'>{item.itemName}</td>
                                                    <td className="TH2" key='b'>{item.empName}</td>
                                                    <td className="TH2" key='c'>{item.empId}</td>
                                                    <td className="TH2" key='d'>{item.dept}</td>
                                                    <td className="TH2" key='e'>{item.requestDate}</td>
                                                    {this.state.status[index] !== 'accepted' ?
                                                        <td className="TH2" key='f'><div className="ButtonDiv"><Button
                                                            className="btnn"
                                                            onClick={() => this.handleAccept(index)}><i
                                                            className="fa fa-check" aria-hidden="true"></i></Button>
                                                            <Button variant="danger" className="btnn"
                                                                    onClick={() => this.handleReject(index)}><i
                                                                className="fa fa-trash" aria-hidden="true"></i></Button></div>
                                                        </td> : false}
                                                    {this.state.status[index] === 'accepted' && item.type === 'devices' ?
                                                        <td className="TH2" key='g'><div  className="ButtonDiv"><Button variant="success"
                                                                                            onClick={() => this.handleConfirm(index)}><i
                                                            className='fa fa-check-square-o'></i></Button>
                                                            <Button variant="danger" className="btnn"
                                                                    onClick={() => this.handleRejectAfterAccept(index)}><i
                                                                className="fa fa-trash" aria-hidden="true"></i></Button></div>
                                                        </td> : false}
                                                    {this.state.status[index] === 'accepted' && item.type !== 'devices' ?
                                                        <td className="TH2" key="h"><div  className="ButtonDiv"><Button
                                                            variant="success"
                                                            onClick={() => this.handleConfirm(index)}><i
                                                            className='fa fa-check-square-o'></i></Button>
                                                            <Button variant="danger" className="btnn"
                                                                    onClick={() => this.handleRejectAfterAccept(index)}><i
                                                                className="fa fa-trash" aria-hidden="true"></i></Button></div>
                                                        </td> : false}
                                                    {this.state.status[index] === 'accepted' && item.type === 'devices' ?
                                                        <td className="TH2"
                                                            key='i'>{this.state.serialNumbers[index]}</td> : false}
                                                </tr>
                                            )
                                        })
                                        }
                                        </tbody>
                                    </Table></> : false}

                                {this.state.current === 'pending' ? <><h1 align="center">Pending Requests</h1><Table
                                    striped
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
                                                <td className="TH2" key="a">{item.itemName}</td>
                                                <td className="TH2" key='b'>{item.serialNumber}</td>
                                                <td className="TH2" key='c'>{item.empName}</td>
                                                <td className="TH2" key='d'>{item.empId}</td>
                                                <td className="TH2" key='e'>{item.acceptDate}</td>
                                                <td className="TH2"
                                                    key={item.estimatedReturnDate}>{item.estimatedReturnDate}</td>
                                                <td className="TH2" key='f'>
                                                    <Button variant="primary"
                                                            onClick={() => this.handleReturn(index)}>Returned
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </Table></> : false}
                                {this.state.current === 'inventory' ? <><h1 align="center">Inventory</h1><Table striped
                                                                                                                bordered
                                                                                                                hover>
                                    <thead>
                                    <tr className="TH">
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.invtInfo.map((item, index) => {

                                        return (
                                            <tr className="TH" key={item.id}>
                                                <td className="TH2" key='a'>{item.itemName}</td>
                                                <td className="TH2" key='b'>{item.qty}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </Table></> : false}
                                {this.state.current === 'users' ? <><h1 align="center">Users List</h1><Table striped
                                                                                                             bordered
                                                                                                             hover>
                                    <thead>
                                    <tr className="TH">
                                        <th>Employee Name</th>
                                        <th>Employee Id</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.users.map((item, index) => {

                                        return (
                                            <tr className="TH" key={item.id}>
                                                <td className="TH2" key='a'>{item.empName}</td>
                                                <td className="TH2" key='b'>{item.empId}</td>
                                                <td className="TH2" key='c'>{item.email}</td>
                                                <td className="TH2" key='d'>{item.dept}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </Table></> : false}
                                {this.state.current === 'dash' ? <>
                                    <br/>
                                    <div>
                                        <h3>Welcome {this.props.user.empName},</h3>
                                    </div>
                                    <br/>
                                    <div class="form-group cold-md-3" align={'left'}>
                                        <h5>Active Requests: {this.state.activeInfo.length}</h5>
                                        <h5>Pending Requests: {this.state.pendingInfo.length}</h5>
                                    </div>
                                </> : false}
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </Container>

        );
    }
}

