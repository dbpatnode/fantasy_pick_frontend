import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setUser } from "../actions";
import api from "../services/api";
import { sortByName, sortByPick, findWinner } from "../services/helpers";

import PickRow from "./picks/PickRow";

class Profile extends React.Component {
  findUserStats = () => {
    let userWins = this.props.userPicks.map((p) =>
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
        .updateStats(this.props.user.id, body)
        .then((data) => console.log(data));
    }
    return userWins.flat();
  };

  render() {
    const { username } = this.props.user;
    const { userLeagues, userPicks, matches } = this.props;

    return (
      <div className="league-container">
        <h1>Hello {username}</h1>

        <table className="profile-league-table">
          <thead>
            <tr>
              <th>Your Leagues</th>
            </tr>
          </thead>
          <tbody>
            {sortByName(userLeagues).map((l) => (
              <tr key={l.id}>
                <td> {l.league_name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="profile-picks-table">
          <thead>
            <th>Your Picks</th>
            <tr>
              <th>Match</th>
              <th>Your Pick</th>
              <th>Status</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {sortByPick(userPicks).map((p) => (
              <tr key={p.id}>
                <PickRow p={p} matches={matches} />
                <td className="profile-table-points">
                  {findWinner(p, matches) ? 1 : null}
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total Points {this.findUserStats().length}</td>{" "}
            </tr>
          </tbody>
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
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
