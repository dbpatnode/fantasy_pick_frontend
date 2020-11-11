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

  // rankings = (league, user) => {
  //   debugger;
  //   league.map((join) => {
  //     // console.log(join.user === user ? return league.indexOf(join) + 1 : "");
  //     return <td>{league.indexOf(join) + 1}</td>;
  //   });
  // };
  render() {
    const league = this.props.leagues.find(
      (league) => league.id === this.props.id
    );

    console.log(league.join);
    return (
      <div className="league-table-container">
        <h1 id="league-name">{league.league_name}</h1>
        {this.props.isUser ? this.checkUserJoin(league) : null}
        <table>
          <thead>
            <tr>
              <th id="player-name">Name</th>
              <th id="player-points">Points</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {sortByPoints(league.join).map((user) => (
              <tr key={user.user.id}>
                {/* {this.rankings(league.join, user)} */}
                <td>{user.user.username}</td>
                <td>{user.user.wins ? user.user.wins : 0}</td>
                <td>{league.join.indexOf(user) + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {this.rankings(league.join)} */}
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
