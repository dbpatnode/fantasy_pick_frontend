import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setLeagues, fetchStandings, fetchMatches, setPicks } from "./actions";
import { useMediaQuery } from "react-responsive";
import { Route, Switch, withRouter } from "react-router-dom";
import api from "./services/api";

import StandingsTable from "./components/standings/StandingsTable";
import MatchesTable from "./components/matches/MatchesTable";
import Navbar from "./components/Navbar";
import LeaguesContainer from "./components/leagues/LeaguesContainer";
import LeagueShowPage from "./components/leagues/LeagueShowPage";
import PageNotFound from "./components/PageNotFound";

import Profile from "./components/Profile";
import PicksContainer from "./components/picks/PicksContainer";

// const Desktop = ({ children }) => {
//   const isDesktop = useMediaQuery({ minWidth: 992 });
//   return isDesktop ? children : null;
// };
// const Tablet = ({ children }) => {
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
//   return isTablet ? children : null;
// };
// const Mobile = ({ children }) => {
//   const isMobile = useMediaQuery({ maxWidth: 767 });
//   return isMobile ? children : null;
// };

class App extends Component {
  componentDidMount() {
    this.props.fetchStandings();
    this.props.fetchMatches();
    api.leagues.getLeagues().then((data) => {
      if (!data.error) {
        this.props.setLeagues(data);
      }
    });
    api.picks.getPicks().then((data) => {
      if (!data.error) {
        this.props.setPicks(data);
      }
    });
  }

  renderMatchesTable = () => <MatchesTable />;
  renderPicksContainer = () => <PicksContainer />;
  renderStandingsTable = () => (
    <StandingsTable standings={this.props.standings} />
  );
  renderLeaguesContainer = () => <LeaguesContainer />;
  renderProfile = () => <Profile />;
  renderLeagueShowPage = (routerProps) => {
    let leagueID = routerProps.match.params.id;
    let league = this.props.leagues.find(
      (league) => league.id === parseInt(leagueID)
    );
    return league ? <LeagueShowPage id={league.id} /> : <PageNotFound />;
  };

  render() {
    return (
      <div className="App">
        <div>
          {/* <Desktop> */}
          <div>
            <Navbar />
          </div>

          <div className="page-container">
            <Switch>
              <Route
                exact
                path="/leagues/:id"
                render={(routerProps) => this.renderLeagueShowPage(routerProps)}
              />
              <Route
                exact
                path="/leagues"
                component={this.renderLeaguesContainer}
              />
              <Route
                exact
                path="/picks"
                component={this.renderPicksContainer}
              />
              <Route
                exact
                path="/matches"
                component={this.renderMatchesTable}
              />
              <Route exact path="/profile" component={this.renderProfile} />
              <Route exact path="/" component={this.renderStandingsTable} />
            </Switch>
          </div>
          {/* </Desktop>
          <Tablet>Tablet</Tablet>
          <Mobile>Mobile</Mobile> */}
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
  };
}

function mapDispatchToProps(dispatch) {
  // actions.js
  return {
    fetchStandings: () => dispatch(fetchStandings()),
    fetchMatches: () => dispatch(fetchMatches()),
    setPicks: (picks) => dispatch(setPicks(picks)),
    setLeagues: (leagues) => dispatch(setLeagues(leagues)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
