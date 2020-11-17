import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setLeagues,
  setPicks,
  setUser,
  setStandings,
  setMatches,
} from "./actions";
import { useMediaQuery } from "react-responsive";
import { Route, Switch, withRouter } from "react-router-dom";
import api from "./services/api";
import { findUsersStats } from "./services/helpers";

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
    if (localStorage.token) {
      api.auth.reauth().then((data) => {
        if (!data.error) {
          this.props.setUser(data);
        } else {
          alert(data.error);
        }
      });
    }

    api.standings.fetchStandings().then((data) => {
      if (!data.error) {
        this.props.setStandings(data);
      }
    });

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
    api.matches.fetchMatches().then((data) => {
      if (!data.error) {
        this.props.setMatches(data);
        this.getUsersStats();
      }
    });
  }

  getUsersStats = () => {
    let arr = findUsersStats(this.props.picks);

    for (let i = 0; i < arr.length; i++) {
      let userPicks = this.props.picks.filter(
        (pick) => pick.user.id === arr[i]
      );

      let userWins = userPicks.map((p) =>
        this.props.matches.filter(
          (m) => m.score.winner === p.winner && m.id === p.match.match_id
        )
      );
      let body = {
        wins: userWins.flat().length,
        losses: userWins.filter((w) => w.length === 0).length,
      };

      if (userWins.length > 0) {
        api.user
          .updateStats(arr[i], body)
          .then((data) => console.log(arr[i], data));
      }
    }
    api.picks.getPicks().then((data) => {
      if (!data.error) {
        this.props.setPicks(data);
      }
    });
  };

  handleAuthResponse = (data) => {
    if (data.user) {
      localStorage.token = data.token;
      this.props.setUser(data);
    }
  };

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
            <Route exact path="/picks" component={this.renderPicksContainer} />
            <Route exact path="/matches" component={this.renderMatchesTable} />
            <Route exact path="/profile" component={this.renderProfile} />
            <Route exact path="/" component={this.renderStandingsTable} />
          </Switch>
        </div>
        {/* </Desktop>
          <Tablet>Tablet</Tablet>
          <Mobile>Mobile</Mobile> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // reducers
  return {
    standings: state.standings,
    leagues: state.leagues,
    picks: state.picks,
    matches: state.matches,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  // actions.js
  return {
    setUser: (user) => dispatch(setUser(user)),

    setPicks: (picks) => dispatch(setPicks(picks)),
    setLeagues: (leagues) => dispatch(setLeagues(leagues)),
    setStandings: (standings) => dispatch(setStandings(standings)),
    setMatches: (matches) => dispatch(setMatches(matches)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
