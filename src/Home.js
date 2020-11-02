import React, { Component } from "react";

class Home extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/matches")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return <div>Hello</div>;
  }
}

export default Home;
