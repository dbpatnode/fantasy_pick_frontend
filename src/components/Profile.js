import React from "react";
import { connect } from "react-redux";

class Profile extends React.Component {
  findMatches = (p) => {
    // let pike = this.props.userPicks.map((p) => p.match.match_id);
    // let filerMatch = pike.map((match) => {
    //   return this.props.matches.filter((m) => m.id === match);
    // });
    //  return filerMatch = filerMatch.flat();
    return this.props.matches.filter((m) => m.id === p.match.match_id);
  };

  render() {
    const { username } = this.props.user;
    const { userLeagues, userPicks } = this.props;
    console.log(userLeagues);
    return (
      <div className="user-container">
        <h1>Hello {username}</h1>
        <table>
          <thead>Your Leagues:</thead>
          {userLeagues.map((l) => (
            <tr key={l.id}>
              <td> {l.league_name}</td>
            </tr>
          ))}
        </table>
        <table>
          <thead>Your Picks:</thead>
          {userPicks.map((p) => (
            <tr key={p.id}>
              <td> {p.winner}</td>
              <td> {p.winner}</td>
              <td> {p.winner}</td>
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
