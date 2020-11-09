import React from "react";
import { connect } from "react-redux";
import { sortByPoints } from "../../services/helpers";

class LeagueShowPage extends React.Component {
  render() {
    const { league_name, join } = this.props.league;
    console.log(join);
    return (
      <div>
        <h1>{league_name}</h1>
        <h3>Leagues Members </h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {/* {join.map((user) => ( */}
            {sortByPoints(join).map((user) => (
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

// function mapStateToProps(state) {
//   // reducers
//   return {
//     user: state.user,
//     leagues: state.leagues,
//     userLeagues: state.userLeagues,
//     isUser: state.isUser,
//   };
// }

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

export default LeagueShowPage;
// export default connect(mapStateToProps, mapDispatchToProps)(LeagueShowPage);
