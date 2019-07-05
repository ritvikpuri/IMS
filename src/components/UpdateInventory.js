import React, { Component } from 'react';
import './../App2.css';

class UpdateInventory extends React.Component {
  constructor(props){
  super(props);   
  this.state = {
      itemName:'',
      qty:0,
      type:''  
      }
 
  this.addItem=this.addItem.bind(this);
  this.handleQtyChange=this.handleQtyChange.bind(this);
  this.handleNameChange=this.handleNameChange.bind(this);
  this.handleTypeChange=this.handleTypeChange.bind(this);
  }
handleNameChange(e){
  this.setState({
    itemName:e.target.value
  })
}

handleTypeChange(e){
  this.setState({
    type:e.target.value
  })
}

handleQtyChange(e){
  this.setState({
    qty:e.target.value
  })
}

addItem(e){  
   e.preventDefault();
   console.log(this.state);
  
     fetch('http://10.0.2.235:8080/inventory/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        itemName:this.state.itemName,
        qty:this.state.qty,
        type:this.state.type
      })
    })
     
  }


render() {
    return (
     <div>
       <form onSubmit={this.addItem}>    
          <p className="InvtLabel">item name</p>
          <input className="InvtInput" type='text' value={this.state.itemName} onChange={this.handleNameChange} required />
          <br/>
          <p className="InvtLabel">quantity to add</p>
          <input className="InvtInput" type='text' value={this.state.qty} onChange={this.handleQtyChange} required/>
          <br/>
         <select className="InvtDropdown" id = "InvtLabel" value={this.state.type} onChange={this.handleTypeChange}>
           <option value = "lol" >select type</option>
           <option value = "Devices" >Devices</option>
           <option value = "Medicine" >Medicine</option>
           <option value = "Stationary">Stationary</option>
         </select>
         <br/>
         <br/>
          <button className="InvtBtn" type='submit' value='submit' data-test="submit" >submit</button>
          <br/>
        </form>    
      </div>
    )
  }
}
export default UpdateInventory

