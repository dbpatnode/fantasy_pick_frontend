import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import MatchRow from "./MatchRow";

class MatchesTable extends React.Component {
  findCurrentMatchDay = () => {
    var now = new Date();
    var isoDate = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString();

    return this.props.matches.find((match) => match.utcDate > isoDate);
  };

  sortCurrentMatches = (data) => {
    if (this.findCurrentMatchDay()) {
      let CurrentMatchDay = this.findCurrentMatchDay().matchday;
      if (data === "current") {
        return this.props.matches
          .filter((match) => match.matchday === CurrentMatchDay)
          .sort((a, b) => (a.matchday - b.matchday ? -1 : 1));
      } else {
        return this.props.matches
          .filter((match) => match.matchday > CurrentMatchDay)
          .sort((a, b) => (a.matchday - b.matchday ? 1 : -1));
      }
    }
  };

  filterByClub = (club) => {
    return this.props.matches.filter(
      (match) =>
        match.homeTeam.name === club ||
        (match.awayTeam.name === club &&
          match.matchday >= this.findCurrentMatchDay().matchday)
    );
    // this.props.matches.filter((match) => match.homeTeam.name === "Sheffield United FC" || match.awayTeam.name === "Sheffield United FC")
  };
  render() {
    return (
      <div className="matches-table-container">
        {this.sortCurrentMatches("all") ? (
          <>
            <h1>Current Week Matches</h1>
            <div className="matches-table">
              <table>
                <thead>
                  <tr>
                    <th>Home Team</th>
                    <th></th>
                    <th>Away Team</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.sortCurrentMatches("current").map((match) => (
                    <tr key={match.id}>
                      <MatchRow match={match} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h1> Future Matches</h1>
            <div className="matches-table">
              <table>
                <thead>
                  <tr>
                    <th>Home Team</th>
                    <th>Away Team</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.sortCurrentMatches("all").map((match) => (
                    <tr key={match.id}>
                      <MatchRow match={match} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          "Loading..."
        )}
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
  };
}

//

export default connect(mapStateToProps)(MatchesTable);
