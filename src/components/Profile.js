import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setUser } from "../actions";
import api from "../services/api";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { sortByName, sortByPick, findWinner } from "../services/helpers";
import PickRow from "./picks/PickRow";
import { loss, draw, won, user } from "../services/svg-icons";
import { relativeTimeThreshold } from "moment";
class Profile extends React.Component {
  state = {
    inputValue: this.props.currentMatchWeek,
  };
  findUserStats = () => {
    //   let userWins = this.props.userPicks.map((p) =>
    //     this.props.matches.filter(
    //       (m) => m.score.winner === p.winner && m.id === p.match.match_id
    //     )
    //   );
    //   let body = {
    //     wins: userWins.flat().length,
    //     losses: userWins.filter((w) => w.length === 0).length,
    //   };
    //   if (userWins.length > 0) {
    //     api.user
    //       .updateStats(this.props.user.id, body)
    //       .then((data) => console.log(data));
    //   }
    //   return userWins.flat();
  };

  handleDropdownChange = (e) => {
    let selected = e.target.textContent;
    this.setState({ inputValue: selected });
  };
  
  matchesByWeek= (matchWeek) => {
   if (matchWeek > 0) {
     return this.props.userPicks.filter(pick => pick.match.matchday == matchWeek)
   }
     return this.props.userPicks
 
   
  }
  render() {
    console.log(this.props.user);
    const { username, wins } = this.props.user;
    const { userLeagues, userPicks, matches } = this.props;
    // console.log(matches);
    const weekOptions = [
      { key: "1", value: "1", flag: "1", text: "1" },
      { key: "2", value: "2", flag: "2", text: "2" },
      { key: "3", value: "3", flag: "3", text: "3" },
      { key: "4", value: "4", flag: "4", text: "4" },
      { key: "5", value: "5", flag: "5", text: "5" },
      { key: "6", value: "6", flag: "6", text: "6" },
      { key: "7", value: "7", flag: "7", text: "7" },
      { key: "8", value: "8", flag: "8", text: "8" },
      { key: "9", value: "9", selected: true, flag: "9", text: "9" },
      { key: "10", value: "10", flag: "10", text: "10" },
      { key: "11", value: "11", flag: "11", text: "11" },
      { key: "12", value: "12", flag: "12", text: "12" },
      { key: "13", value: "13", flag: "13", text: "13" },
      { key: "14", value: "14", flag: "14", text: "14" },
      { key: "15", value: "15", flag: "15", text: "15" },
      { key: "16", value: "16", flag: "16", text: "16" },
      { key: "17", value: "17", flag: "17", text: "17" },
      { key: "18", value: "18", flag: "18", text: "18" },
      { key: "19", value: "19", flag: "19", text: "19" },
      { key: "20", value: "20", flag: "20", text: "20" },
      { key: "21", value: "21", flag: "21", text: "21" },
      { key: "22", value: "22", flag: "22", text: "22" },
      { key: "24", value: "24", flag: "24", text: "24" },
      { key: "25", value: "25", flag: "25", text: "25" },
      { key: "26", value: "26", flag: "26", text: "26" },
      { key: "27", value: "27", flag: "27", text: "27" },
      { key: "28", value: "28", flag: "28", text: "28" },
      { key: "29", value: "29", flag: "29", text: "29" },
      { key: "30", value: "30", flag: "30", text: "30" },
      { key: "31", value: "31", flag: "31", text: "31" },
      { key: "32", value: "32", flag: "32", text: "32" },
      { key: "33", value: "33", flag: "33", text: "33" },
      { key: "34", value: "34", flag: "34", text: "34" },
      { key: "35", value: "35", flag: "35", text: "35" },
      { key: "36", value: "36", flag: "36", text: "36" },
      { key: "37", value: "37", flag: "37", text: "37" },
      { key: "38", value: "38", flag: "38", text: "38" },
    ];



    return (
      <div className="page-container">
        {/* <label for="Week">Week:</label>

        <select className="ui-dropdown">{}</select> */}

        <div className="league-container">
          <h5>Logged in as: {username}</h5>

          <div className="profile-header">
            <span class="ui statistic">
              <h1>Fantasy</h1>
              <span className="value">{wins}</span>
              <span class="label">Total Points</span>
            </span>
            
            <div className="user-profile-leagues">
              <h1>Your Leagues</h1>

              {sortByName(userLeagues).map((l) => (
                <div key={l.id}>
                  <div className="individual-league">
                    <Link id="league-link" to={`/leagues/${l.id}`}>
                      {l.league_name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="picks-container">
              <h1>Your Picks</h1>
              <h3>Matchweek:</h3>
              <Dropdown
                placeholder="Week"
                selection
                options={weekOptions}
                value={this.state.inputValue}
                onChange={(e) => this.handleDropdownChange(e)}
              />
              </div>
              <div id="matches-outcome">
                {this.matchesByWeek(this.state.inputValue).length > 0 ? 
                <div>
                {sortByPick(this.matchesByWeek(this.state.inputValue)).map((p) => (
                  <div key={p.id}>
                    <PickRow
                      p={p}
                      matches={matches}
                      matchWeek={this.state.inputValue}
                    />
                    <div className="profile-table-points">
                      {findWinner(p, matches) ? 1 : null}
                    </div>
                  </div>
                ))} </div> :<h1>no picks</h1>}
                <div>Total Points {wins}</div>{" "}
              </div>
            
          </div>
        </div>
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
    currentMatchWeek: state.currentMatchWeek,
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
