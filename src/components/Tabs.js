import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LoggedInAsAdmin from './Admin';

class DisabledTabs extends React.Component {
  constructor(props){
    super(props);
    this.state={
      newValue:'active'
    }
    this.handleChange=this.handleChange.bind(this);
  }

handleChange(event) {
    this.props.sendDataToAdmin(event.target.value);
  }
render(){
  return (
   
  );}
}

export default Tabs

onChange={(e)=>{this.setState({current:e.target.value})}}