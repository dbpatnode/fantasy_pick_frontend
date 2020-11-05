import React from "react";
import { connect } from "react-redux";
import moment from "moment";

class MatchesTable extends React.Component {
  futureMatches = () => {
    var now = new Date();
    var isoDate = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString();

    return this.props.matches.filter((match) => match.utcDate > isoDate);
  };
  currentGameDay = () => {
    if (this.futureMatches()[0]) {
      let currentGameDay = this.futureMatches()[0].matchday;
      return this.props.matches
        .filter((match) => match.matchday === currentGameDay)
        .sort((a, b) => (a.matchday - b.matchday ? -1 : 1));
    }
  };

  filterByClub = (club) => {
    return this.futureMatches().filter(
      (match) => match.homeTeam.name === club || match.awayTeam.name === club
    );
    // this.props.matches.filter((match) => match.homeTeam.name === "Sheffield United FC" || match.awayTeam.name === "Sheffield United FC")
  };

  render() {
    console.log(this.props.matches);
    return (
      <div>
        {this.currentGameDay() ? (
          <div>
            Current Week Matches
            <table>
              <thead>
                <tr>
                  <th>Home Team</th>
                  <th>Away Team</th>
                  <th>Date</th>
                </tr>
              </thead>

              {this.currentGameDay().map((match) => (
                <tr key={match.id}>
                  <td>{match.homeTeam.name} </td>
                  <td>{match.awayTeam.name}</td>
                  <td>{moment(match.utcDate).format("LLLL")}</td>
                </tr>
              ))}
            </table>
          </div>
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
  };
}

//

export default connect(mapStateToProps)(MatchesTable);
