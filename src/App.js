import "./App.css";
import Home from "./Home";
import Login from "./components/login-signup/Login";
import Signup from "./components/login-signup/Signup";
import Logout from "./components/login-signup/Logout";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser, fetchStandings, setLogout, fetchMatches } from "./actions";
import { useMediaQuery } from "react-responsive";
import api from "./services/api";
import { Collapse, Button } from "reactstrap";
import StandingsTable from "./components/standings/StandingsTable";
import logo from './fantasy-pickem.png'
import MatchesTable from "./components/matches/MatchesTable";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

class App extends Component {
  state = {
    loginOpen: false,
    signUpOpen: false,
  };
  componentDidMount() {
    this.props.fetchStandings();
    this.props.fetchMatches();
  }

  handleLogin = (e, user) => {
    e.preventDefault();
    api.auth
      .login(user)
      .then((data) => {
        if (!data.error) {
          this.handleAuthResponse(data);
        } else {
          alert("Wrong Username or Password");
        }
      })
      .catch((err) => console.log(err));
  };
  handleSignUp = (e, user) => {
    e.preventDefault();
    api.auth
      .signup(user)
      .then((data) => {
        if (!data.error) {
          this.handleAuthResponse(data);
        } else {
          alert("Wrong Username or Password");
        }
      })
      .catch((err) => console.log(err));
  };
  handleAuthResponse = (data) => {
    if (data.user) {
      localStorage.token = data.jwt;
      this.props.setUser(data);
      this.setState({
        loginOpen: false,
        signUpOpen: false,
      });
    }
  };
  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.setLogout();
  };

  toggleLogin = () => {
    this.setState({
      loginOpen: !this.state.loginOpen,
      signUpOpen: false,
    });
  };
  toggleSignUp = () => {
    this.setState({
      signUpOpen: !this.state.signUpOpen,
      loginOpen: false,
    });
  };
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <div>
          <Desktop>
            <div className="page-container">
              <div id="main-menu">
                <div className="logo-area">
                <a href=""><img className="logo" src={logo} alt="logo"></img></a>
                </div>
                <div className="inner-main-menu">
                <ul className="nav-links">
                  {!this.props.token ? (
                    <>
                     <li><a href="#">Leagues</a></li>
                      <li><a href="#">Picks</a></li>
                      <li><a href="#">Matches</a></li>
                      
                        <li><a href="#" onClick={this.toggleLogin}>Login</a></li>
                        <Collapse isOpen={this.state.loginOpen}>
                          <Login handleLogin={this.handleLogin} />
                        </Collapse>{" "}
                      
                      
                        <li><a href="#" onClick={this.toggleSignUp}>Signup</a></li>
                        <Collapse isOpen={this.state.signUpOpen}>
                          <Signup handleSignUp={this.handleSignUp} />
                        </Collapse>{" "}
                      <li><a href="#">Profile</a></li>
                    </>
                  ) : (
                    <Logout handleLogout={this.handleLogout} />
                  )}
                </ul>
              </div>
              </div>
              <MatchesTable />
              <StandingsTable standings={this.props.standings} />
            </div>
          </Desktop>
          <Tablet>Tablet</Tablet>
          <Mobile>Mobile</Mobile>
        </div>
        {/* </header> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // reducers
  return {
    standings: state.standings,
    token: state.token,
    matches: state.matches,
  };
}

function mapDispatchToProps(dispatch) {
  // actions.js
  return {
    setUser: (user) => dispatch(setUser(user)),
    setLogout: () => dispatch(setLogout()),
    fetchStandings: () => dispatch(fetchStandings()),
    fetchMatches: () => dispatch(fetchMatches()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
