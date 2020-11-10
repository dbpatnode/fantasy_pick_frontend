import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { sortByPoints } from "../../services/helpers";
import JoinLeague from "./JoinLeague";

class LeagueShowPage extends React.Component {
  checkUserJoin = (league) => {
    let userJoin = this.props.user.joined_leagues.find(
      (l) => l.id === league.id
    );
    if (!userJoin) {
      return this.renderJoinLeague(league);
    }
  };
  renderJoinLeague = (league) => <JoinLeague league={league} />;

  render() {
    const league = this.props.leagues.find(
      (league) => league.id === this.props.id
    );

    console.log(league.join);
    return (
      <div>
        <h1>{league.league_name}</h1>
        {this.props.isUser ? this.checkUserJoin(league) : null}
        <h3>Leagues Members </h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {sortByPoints(league.join).map((user) => (
              <tr key={user.user.id}>
                <td>{user.user.username}</td>
                <td>{user.user.wins ? user.user.wins : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isUser: state.isUser,
    leagues: state.leagues,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     addJoinToLeague(join) {
//       dispatch(addJoinToLeague(join));
//     },
//     setLeagues(leagues) {
//       dispatch(setLeagues(leagues));
//     },
//   };
// }

export default connect(mapStateToProps)(withRouter(LeagueShowPage));
