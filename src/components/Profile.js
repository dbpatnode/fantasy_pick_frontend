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
  findWeeks = () => {
    let array = this.props.userPicks.map((pick) => pick.match.matchday);
    let uniq = [...new Set(array)];
    return uniq;
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
    console.log(this.props.user);

    const { username, wins } = this.props.user;
    const { userLeagues, userPicks, matches } = this.props;
    // console.log(matches);

    return (
      <div className="page-container">
        <div className="league-container">
          <h5>Logged in as: {username}</h5>

          <div className="profile-header">
            <span className="ui statistic">
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
                placeholder={`Week ${this.state.inputValue}`}
                selection
                value={this.state.inputValue}
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
            </div>
            <div id="matches-outcome">
              {this.matchesByWeek(this.state.inputValue).length > 0 ? (
                <div>
                  {sortByPick(this.matchesByWeek(this.state.inputValue)).map(
                    (p) => (
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
                    )
                  )}{" "}
                </div>
              ) : (
                <h1>no picks</h1>
              )}
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
