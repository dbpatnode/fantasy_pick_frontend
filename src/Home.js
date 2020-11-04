import React, { Component } from "react";
import {Button, Collapse, Card} from 'reactstrap'

class Home extends Component {
  state = {
    isOpen: false,
    signUpOpen: false
  }
  toggleLogin = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
      }
  render() {
    return <div>
       <Button onClick={this.toggleLogin}>Login</Button>
    <Collapse isOpen={this.state.isOpen}>
                <Card>HELLO</Card>
    </Collapse> 
    </div>;
  }
}

export default Home;
