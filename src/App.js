import "./App.css";
import Home from "./Home";
import Login from "./components/login-signup/Login";
import Signup from "./components/login-signup/Signup";
import Logout from "./components/login-signup/Logout";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser, fetchStandings, setLogout } from "./actions";
import { useMediaQuery } from "react-responsive";
import { loss, draw, won } from "./services/svg-icons";
import api from "./services/api";
import { Collapse, Card, Button, CardBody } from "reactstrap";

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
    console.log(this.state);
    return (
      <div className="App">
        {/* <header className="App-header"> */}
        <div>
          <Desktop>
            <div className="page-container">
              <header class="header">My header</header>
              <div className="wrapper">
                {!this.props.token ? (
                  <>
                    <span>
                      <Button onClick={this.toggleLogin}>Login</Button>
                      <Collapse isOpen={this.state.loginOpen}>
                        <Login handleLogin={this.handleLogin} />
                      </Collapse>{" "}
                    </span>

                    <span>
                      <Button onClick={this.toggleSignUp}>Signup</Button>
                      <Collapse isOpen={this.state.signUpOpen}>
                        <Signup handleSignUp={this.handleSignUp} />
                      </Collapse>{" "}
                    </span>
                  </>
                ) : (
                  <Logout handleLogout={this.handleLogout} />
                )}
              </div>

              {/* <article class="content">
                <h1>2 column, header and footer</h1>
                <p>
                  This example uses line-based positioning, to position the
                  header and footer, stretching them across the grid.
                </p>
              </article>
              <article class="content">
                <h1>2 column, header and footer</h1>
                <p>
                  This example uses line-based positioning, to position the
                  header and footer, stretching them across the grid.
                </p>
              </article> */}

              <div className="standings-table">
                <table className="standings-D">
                  <thead>
                    <tr>
                      <th></th>
                      <th id="standings-club-D">Club</th>
                      <th>Matches</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>Points</th>
                      <th>Last 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.standings[0]
                      ? this.props.standings[0].map((table) => (
                          <tr className="standings-row-D">
                            <td id="standings-crest-td-D">
                              <span className="standings-position-D">
                                {table.position}
                              </span>
                              <img
                                src={table.team.crestUrl}
                                alt="team crest"
                                className="standings-crest-D"
                              ></img>
                            </td>
                            <td id="standings-club-D">{table.team.name}</td>
                            <td>{table.playedGames}</td>
                            <td>{table.won}</td>
                            <td>{table.draw}</td>
                            <td>{table.lost}</td>
                            <td>{table.points}</td>
                            <td>
                              {table.form.split(",").map((game) => (
                                <span>
                                  {game == "W" ? (
                                    <span className="Won">{won}</span>
                                  ) : null}
                                  {game == "L" ? (
                                    <span className="Loss">{loss}</span>
                                  ) : null}
                                  {game == "D" ? (
                                    <span className="Draw">{draw}</span>
                                  ) : null}
                                </span>
                              ))}
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
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
  return { standings: state.standings, token: state.token };
}

function mapDispatchToProps(dispatch) {
  // actions.js
  return {
    fetchStandings: () => dispatch(fetchStandings()),
    setUser: (user) => dispatch(setUser(user)),
    setLogout: () => dispatch(setLogout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
