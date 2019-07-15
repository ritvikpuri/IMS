import React, {Component} from 'react';
import './App.css';
import {Jumbotron, Container, Nav, Button, NavDropdown} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';


class App extends Component {
    render() {
        return (
            <Container>
                <Jumbotron>
                    <div class="form-group">
                        <div class="form-group col-md-3">
                            <Nav defaultActiveKey="/home" className="flex-column">
                                <Nav.Link href="/home">Admin Dashboard</Nav.Link>
                                <NavDropdown title="Requests" id="request-dropdown">
                                    <NavDropdown.Item eventKey="link">New</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="link">Pending</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="link">History</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Inventory" id="inventory-dropdown">
                                    <NavDropdown.Item eventKey="link">Add Item</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="link">Inventory List</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link eventKey="link-2">User</Nav.Link>
                            </Nav>
                        </div>
                    </div>
                </Jumbotron>
            </Container>
        );
    }
}

export default App;
