import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setLeagues, fetchStandings, fetchMatches } from "./actions";
import { useMediaQuery } from "react-responsive";
import { Route, Switch, withRouter } from "react-router-dom";


import StandingsTable from "./components/standings/StandingsTable";
import MatchesTable from "./components/matches/MatchesTable";
import Navbar from "./components/Navbar";
import LeaguesContainer from "./components/leagues/LeaguesContainer";
import api from "./services/api";
import Profile from "./components/Profile"

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
    this.props.fetchMatches();
    api.leagues.getLeagues().then((data) => {
      if (!data.error) {
        this.props.setLeagues(data);
      }
    });
  }

  renderMatchesTable = () => <MatchesTable />;
  renderStandingsTable = () => (
    <StandingsTable standings={this.props.standings} />
  );
  renderLeaguesContainer = () => <LeaguesContainer leagues={this.props.leagues}/>;
  renderProfile = () => <Profile />

  render() {
    console.log(this.props);
    return (
      <div className="App">
        
        <div>
          <Desktop>
            <div>
              <Navbar />
            </div>

            <div className="page-container">
              <Switch>
                <Route
                  exact
                  path="/leagues"
                  component={this.renderLeaguesContainer}
                />
                <Route
                  exact
                  path="/matches"
                  component={this.renderMatchesTable}
                />
                <Route 
                path="/" 
                component={this.renderStandingsTable} 
                />
                <Route
                  exact
                  path="/profile"
                  component={this.renderProfile}
                />
              </Switch>
            </div>
          </Desktop>
          <Tablet>Tablet</Tablet>
          <Mobile>Mobile</Mobile>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // reducers
  return {
    standings: state.standings,
    leagues: state.leagues,
    // matches: state.matches,
  };
}

function mapDispatchToProps(dispatch) {
  // actions.js
  return {
    fetchStandings: () => dispatch(fetchStandings()),
    fetchMatches: () => dispatch(fetchMatches()),
    setLeagues: (leagues) => dispatch(setLeagues(leagues)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
