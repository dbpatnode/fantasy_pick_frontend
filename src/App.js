import "./App.css";
import Home from "./Home";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStandings } from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchStandings();
  }
  handleOnClick2 = () => {
    console.log(this.props.standings);
  };
  render() {
    console.log(this.props.standings);

    return (
      <div className="App">
        <header className="App-header">
          <Home />
          <div>
            {/* <button onClick={(event) => this.handleOnClick(event)}>
              Fetch Stendings
            </button> */}
            <button onClick={(event) => this.handleOnClick2(event)}>
              console Stendings
            </button>
          </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // reducers
  return { standings: state.standings };
}

function mapDispatchToProps(dispatch) {
  // actions.js
  return { fetchStandings: () => dispatch(fetchStandings()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
