import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setUser } from "../actions";
// import api from "../services/api";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import {
  sortByName,
  sortByPick,
  findWinner,
  sortByValue,
} from "../services/helpers";
import PickRow from "./picks/PickRow";
// import { loss, draw, won, user } from "../services/svg-icons";
// import { relativeTimeThreshold } from "moment";
class Profile extends React.Component {
  state = {
    inputValue: this.props.currentMatchWeek,
  };
  findWeeks = () => {
    let array = this.props.userPicks.map((pick) => pick.match.matchday);
    let uniq = [...new Set(array)];
    // console.log(uniq);
    return sortByValue(uniq);
  };

  handleDropdownChange = (e) => {
    let selected = e.target.textContent;
    this.setState({ inputValue: selected });
  };

  matchesByWeek = (matchWeek) => {
    if (matchWeek > 0) {
      return this.props.userPicks.filter(
        (pick) => pick.match.matchday == matchWeek
      );
    }
    return this.props.userPicks;
  };
  render() {
    // console.log("USERR", this.props.user);
    let matchWeekInput = this.state.inputValue;
    matchWeekInput === ""
      ? (matchWeekInput = this.props.currentMatchWeek)
      : (matchWeekInput = this.state.inputValue);
    const { username, wins } = this.props.user;
    const { userLeagues, userPicks, matches } = this.props;
    // console.log(this.state.inputValue === "" ? "Yes" : "NO");

    return (
      <div className="page-container1">
        <div class="ui statistic">
          <h5>Logged in as: {username}</h5>
          <h1>Fantasy</h1>
          <span className="value">{wins}</span>
          <span class="label">Total Points</span>
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
        </div>

        <div className="picks-container">
          <h1>Your Picks</h1>
          <h3>Matchweek:</h3>
          <Dropdown
            placeholder={`Week ${matchWeekInput}`}
            selection
            value={matchWeekInput}
            onChange={(e) => this.handleDropdownChange(e)}
          >
            <Dropdown.Menu>
              {this.findWeeks().map((week) => (
                <Dropdown.Item
                  key={`week${week}`}
                  value={week}
                  flag={week}
                  text={week}
                  onClick={(e) => this.handleDropdownChange(e)}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <div id="matches-outcomee">
            {sortByPick(this.matchesByWeek(this.state.inputValue)).map((p) => (
              <div key={p.id}>
                <PickRow
                  p={p}
                  matches={matches}
                  matchWeek={this.state.inputValue}
                />
              </div>
            ))}
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
