import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setLeagues,
  setPicks,
  setUser,
  setStandings,
  setMatches,
  setMatchWeek,
} from "./actions";
import { useMediaQuery } from "react-responsive";
import { Route, Switch, withRouter } from "react-router-dom";
import api from "./services/api";
import { usersIdList, findMatchesForCurrentMatchDay } from "./services/helpers";

import StandingsTable from "./components/standings/StandingsTable";
import MatchesTable from "./components/matches/MatchesTable";
import Navbar from "./components/Navbar";
import LeaguesContainer from "./components/leagues/LeaguesContainer";
import LeagueShowPage from "./components/leagues/LeagueShowPage";
import PageNotFound from "./components/PageNotFound";
import ClubShowPage from "./components/ClubShowPage";

import Profile from "./components/Profile";
import PicksContainer from "./components/picks/PicksContainer";

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
        this.setMatchWeek();
        if (this.props.picks.length && this.props.matches > 0)
          this.getUsersStats();
      }
    });
  }

  getUsersStats = () => {
    // if (this.props.picks.length > 0 && this.props.matches.length > 0) {

    let users = usersIdList(this.props.picks, this.props.matches);

    for (let i = 0; i < users.length; i++) {
      let userPicks = this.props.picks.filter(
        (pick) => pick.user.id === users[i]
      );

      let userWins = userPicks.map((p) =>
        this.props.matches.filter(
          (m) => m.score.winner === p.winner && m.id === p.match.match_id
        )
      );

      let userScores = userPicks.map((p) =>
        this.props.matches.filter(
          (m) =>
            m.score.fullTime.homeTeam === p.homeTeam &&
            m.score.fullTime.awayTeam === p.awayTeam &&
            m.id === p.match.match_id &&
            m.status === "FINISHED"
        )
      );

      let wins = userWins.flat().length + userScores.flat().length * 3;
      // debugger
      let body = {
        wins: wins,
        losses: userWins.filter((w) => w.length === 0).length,
      };

      if (wins > 0) {
        api.user
          .updateStats(users[i], body)
          .then((data) => console.log(users[i], data));
      }
    }
    api.picks.getPicks().then((data) => {
      if (!data.error) {
        this.props.setPicks(data);
      }
    });
  };
  // }

  setMatchWeek = () => {
    let week = findMatchesForCurrentMatchDay(this.props.matches).matchday;
    this.props.setMatchWeek(week);
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
    let leagueId = routerProps.match.params.id;
    let league = this.props.leagues.find(
      (league) => league.id === parseInt(leagueId)
    );
    return league ? <LeagueShowPage id={league.id} /> : <PageNotFound />;
  };
  renderClubShowPage = (routerProps) => {
    let clubName = routerProps.match.params.clubName;

    let club = this.props.standings.filter(
      (club) => club.team.name === clubName
    )[0];
    return club ? <ClubShowPage team={club.team} /> : <PageNotFound />;
  };

  render() {
    let club = this.props.standings.map((club) => club.team.name);
    return (
      <div className="App">
        {/* <Desktop> */}
        <div>
          {/* {this.props.picks.length > 0 && this.props.matches.length > 0 ? this.getUsersStats() : null} */}
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
            <Route
              exact
              path="/club/:clubName"
              render={(routerProps) => this.renderClubShowPage(routerProps)}
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
    setMatchWeek: (week) => dispatch(setMatchWeek(week)),
    setPicks: (picks) => dispatch(setPicks(picks)),
    setLeagues: (leagues) => dispatch(setLeagues(leagues)),
    setStandings: (standings) => dispatch(setStandings(standings)),
    setMatches: (matches) => dispatch(setMatches(matches)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
