import React, {Component} from 'react';
import {Form, Col, Button} from "react-bootstrap";

class UpdateInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            qty: 1,
            type: '',
            sno: '',
            error: ''
        };

        this.addItem = this.addItem.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.handleSnoChange = this.handleSnoChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    handleNameChange(e) {
        this.setState({
            itemName: e.target.value
        })
    }

    handleTypeChange(e) {
        this.setState({error: ''});
        console.log(e.target.value);
        this.setState({
            type: e.target.value,
            itemName: '',
            qty: 0,
            sno: ''
        })
    }

    handleQtyChange(e) {
        this.setState({error: ''});
        this.setState({
            qty: e.target.value
        })
    }

    handleSnoChange(e) {
        this.setState({error: ''});
        this.setState({
            sno: e.target.value
        })
    }

    addItem(e) {
        this.setState({error: 'Item Added'});
        e.preventDefault();
        console.log(this.state);
        if (this.state.type !== 'Devices') {
            fetch('http://10.0.2.235:8080/inventory/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName: this.state.itemName,
                    qty: this.state.qty,
                    type: this.state.type
                })
            })
        } else {
            fetch('http://10.0.2.235:8080/inventory/add/devices', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName: this.state.itemName,
                    qty: this.state.qty,
                    type: this.state.type,
                    serialNumber: this.state.sno
                })
            })
        }

    }


    render() {
        return (
            <div align="center">
                <h1 align="center">Add Item to Inventory</h1>
                <br/><br/>
                <form onSubmit={this.addItem}>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            Select Item Category
                        </div>
                        <div class="form-group col-md-3">
                            <Form.Group as={Col} id="InvtLabel" value={this.state.type}
                                        onChange={this.handleTypeChange}>
                                <Form.Control as="select">
                                    <option value="select">Select Type</option>
                                    <option value="Medicine">Medicine</option>
                                    <option value="Stationary">Stationary</option>
                                    <option value="Devices">Devices</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-3">
                            Item Name
                        </div>
                        <div className="form-group col-md-3">
                            <input type="text" value={this.state.itemName} onChange={this.handleNameChange}/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            {this.state.type !== 'Devices' ? <p>Quantity to Add</p> : false}
                            {this.state.type === 'Devices' ? <p>Serial Number</p> : false}
                        </div>
                        <div class="form-group col-md-3">
                            {this.state.type !== 'Devices' ?
                                <input type="text" value={this.state.qty} onChange={this.handleQtyChange}/> : false}
                            {this.state.type === 'Devices' ?
                                <input type="text" value={this.state.sno} onChange={this.handleSnoChange}
                                       required/> : false}

                        </div>
                    </div>

                    <br/>
                    <br/>
                    <Button variant="outline-success" type="submit" value="Submit">Add Item</Button>
                    <br/>
                </form>
                <br/>
                <br/>
                <div><p>{this.state.error}</p></div>
            </div>
        )
    }
}

export default UpdateInventory

