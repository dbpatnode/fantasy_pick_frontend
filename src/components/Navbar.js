import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser, setLogout } from "../actions";
import api from "../services/api";
import logo from "../premier_league2.png";
import { Link } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";

import Login from "../components/login-signup/Login";
import Signup from "../components/login-signup/Signup";

class Navbar extends Component {
  state = {
    loginOpen: false,
    signUpOpen: false,
    modal: false,
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
        console.log(data);
        if (!data.error) {
          this.handleAuthResponse(data);
        } else {
          alert(data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  handleAuthResponse = (data) => {
    if (data.user) {
      localStorage.token = data.token;
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
                <Link to="/leagues">Leagues</Link>
              </li>
              <li>
                <Link to="#">Picks</Link>
              </li>
              <li>
                <Link to="/matches">Matches</Link>
              </li>
              {!this.props.isUser ? (
                <>
                  <li>
                    <button
                      className="nav-links-button"
                      onClick={this.toggleLogin}
                    >
                      Login
                    </button>
                    <Modal
                      isOpen={this.state.loginOpen}
                      toggle={this.toggleLogin}
                    >
                      <ModalHeader toggle={this.toggleLogin}>Login</ModalHeader>
                      <Login handleLogin={this.handleLogin} />
                    </Modal>
                  </li>
                  <li>
                    <button
                      className="nav-links-button"
                      onClick={this.toggleSignUp}
                    >
                      Signup
                    </button>
                    <Modal
                      isOpen={this.state.signUpOpen}
                      toggle={this.toggleSignUp}
                    >
                      <ModalHeader toggle={this.toggleSignUp}>
                        Signup
                      </ModalHeader>
                      <Signup handleSignUp={this.handleSignUp} />
                    </Modal>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={this.handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
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
    isUser: state.isUser,
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
