import "./App.css";
import Home from "./Home";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStandings } from "./actions";
import { useMediaQuery } from "react-responsive";

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
  componentDidMount() {
    this.props.fetchStandings();
  }
  handleOnClick2 = () => {
    console.log(this.props.standings);
  };
  render() {
    console.log(this.props.standings);

    let won = (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-check-circle-fill"
        fill="green"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </svg>
    );

    let draw = (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-dash-circle-fill"
        fill="lightgrey"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
        />
      </svg>
    );

    let loss = (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-x-circle-fill"
        fill="#e60000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
        />
      </svg>
    );

    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Desktop>
              <table className="standings-D">
                <tbody>
                  <tr>
                    <th></th>
                    <th id="standings-club-D">Club</th>
                    <th>Matches</th>
                    <th>Wins</th>
                    <th>Draws</th>
                    <th>Losses</th>
                    <th>Points</th>
                    <th>Last 5</th>
                  </tr>
                  {this.props.standings[0]
                    ? this.props.standings[0].map((table) => (
                        <tr className="standings-row-D">
                          <td>
                            {table.position}
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
            </Desktop>
            <Tablet>Tablet</Tablet>
            <Mobile>Mobile</Mobile>
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
