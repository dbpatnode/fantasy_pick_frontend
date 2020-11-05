import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser, setLogout } from "../actions";
import api from "../services/api";
import { Collapse } from "reactstrap";
import logo from "../fantasy-pickem.png";
import { Link } from "react-router-dom";

import Logout from "../components/login-signup/Logout";
import Login from "../components/login-signup/Login";
import Signup from "../components/login-signup/Signup";

class Navbar extends Component {
  state = {
    loginOpen: false,
    signUpOpen: false,
  };

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
    return (
      <div className="page-container">
        <div id="main-menu">
          <div className="logo-area">
            <Link to="/">
              <img className="logo" src={logo} alt="logo"></img>
            </Link>
          </div>
          <div className="inner-main-menu">
            <ul className="nav-links">
              <li>
                <Link to="#">Leagues</Link>
              </li>
              <li>
                <Link to="#">Picks</Link>
              </li>
              <li>
                <Link to="/matches">Matches</Link>
              </li>
              {!this.props.token ? (
                <>
                  <li>
                    <Link to="" onClick={this.toggleLogin}>
                      Login
                    </Link>
                  </li>
                  {this.state.loginOpen === true ? (
                    <div className="sign-in-form">
                      {" "}
                      <Login handleLogin={this.handleLogin} />
                    </div>
                  ) : (
                    <div className="login-hidden">
                      <Login handleLogin={this.handleLogin} />
                    </div>
                  )}
                  <li>
                    <a href="#" onClick={this.toggleSignUp}>
                      Signup
                    </a>
                  </li>
                  <Collapse isOpen={this.state.signUpOpen}>
                    <Signup handleSignUp={this.handleSignUp} />
                  </Collapse>{" "}
                  <li>
                    <a href="#">Profile</a>
                  </li>
                </>
              ) : (
                <Logout handleLogout={this.handleLogout} />
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // reducers
  return {
    token: state.token,
  };
}

function mapDispatchToProps(dispatch) {
  // actions.js
  return {
    setUser: (user) => dispatch(setUser(user)),
    setLogout: () => dispatch(setLogout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
