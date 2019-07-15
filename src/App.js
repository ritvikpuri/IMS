import React, {Component} from 'react';
import './App.css';
import {Jumbotron, Container, Nav, Navbar, NavDropdown, FormControl, Button, Form, ListGroup} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';


class App extends Component {
    constructor(props){
        super(props);
        this.state={
            current:''
        }
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(){
        console.log('clicked');
    }


    render() {
        return (
            <Container>
                <Jumbotron>
                    <div class="form-group">
                        <Navbar bg="primary" variant="dark">
                            <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
                            <Nav className="mr-auto"/>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                                <Button variant="outline-light">Search</Button>
                            </Form>
                        </Navbar>
                        <br/>
                        <div class="form-group col-md-3">
                            <ListGroup>
                                <ListGroup.Item variant="info">Requests</ListGroup.Item>
                                <ListGroup.Item action onClick={this.handleClick}>New</ListGroup.Item>
                                <ListGroup.Item action href="link2">Pending</ListGroup.Item>
                                <ListGroup.Item action href="link3">History</ListGroup.Item>
                                <br/>
                                <ListGroup.Item variant="info">Inventory</ListGroup.Item>
                                <ListGroup.Item action href="link4">Add Item</ListGroup.Item>
                                <ListGroup.Item action href="link5">Inventory List</ListGroup.Item>
                                <br/>
                                <ListGroup.Item variant="info">Users</ListGroup.Item>
                                <ListGroup.Item action href="link6">User List</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </Jumbotron>
            </Container>
        );
    }
}

export default App;
