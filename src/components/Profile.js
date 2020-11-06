import React from "react";
import { connect } from "react-redux";
import { sortBy, sortByPick } from "../services/helpers";

class Profile extends React.Component {
  findMatch = (p, data) => {
    let match = this.props.matches.filter((m) => m.id === p.match.match_id);
    switch (data) {
      case "away": {
        return match.map((m) => m.awayTeam.name);
      }
      case "home": {
        return match.map((m) => m.homeTeam.name);
      }
      case "status": {
        return match.map((m) => m.status);
      }
    }
    return data;
  };

  findWinner = (p) => {
    let match = this.props.matches.filter((m) => m.id === p.match.match_id);
    let realWinner = match.map((m) => m.score.winner);
    let pickWinner = p.winner;
    return realWinner[0] === pickWinner;
  };
  findClub = (p) => {
    if (p.winner === "HOME_TEAM") {
      return p.match.home_team_name;
    } else {
      return p.match.away_team_name;
    }
  };

  findUserStats = () => {
    let userWines = this.props.userPicks.map((p) =>
      this.props.matches.filter(
        (m) => m.score.winner === p.winner && m.id === p.match.match_id
      )
    );
    //fetch to update win in backend and points
    return userWines.flat();
  };

  render() {
    const { username } = this.props.user;
    const { userLeagues, userPicks } = this.props;
    console.log(userPicks);
    return (
      <div className="league-container">
        <h1>Hello {username}</h1>
        you have {this.findUserStats().length} points.
        <table>
          <thead>Your Leagues:</thead>
          {sortBy(userLeagues).map((l) => (
            <tr key={l.id}>
              <td> {l.league_name}</td>
            </tr>
          ))}
        </table>
        <table>
          <thead>
            Your Picks:
            <tr>
              <th>Match</th>
              <th>Your Pick</th>
              <th>Status</th>
            </tr>
          </thead>
          {sortByPick(userPicks).map((p) => (
            <tr key={p.id}>
              <td>
                {" "}
                {this.findMatch(p, "home")} vs. {this.findMatch(p, "away")}
              </td>
              <td>{this.findClub(p)}</td>
              {this.findMatch(p, "status") == "FINISHED" ? (
                <td>{this.findWinner(p, p.winner) ? "Win" : "Lost"}</td>
              ) : (
                <td> No final Score yet </td>
              )}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  // reducers
  return {
    matches: state.matches,
    user: state.user,
    token: state.token,
    userLeagues: state.userLeagues,
    userPicks: state.userPicks,
    matches: state.matches,
  };
}

export default connect(mapStateToProps)(Profile);
