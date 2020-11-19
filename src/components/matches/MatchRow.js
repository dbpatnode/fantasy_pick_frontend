import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Pick from "./Pick";
import { getTime, removeFC } from "../../services/helpers";

class MatchRow extends React.Component {
  state = {
    isPicked: false,
  };
  handlePick = () => {
    this.setState({ isPicked: !this.state.isPicked });
  };

  gameStatus = (status, match) => {
    if (status === "IN_PLAY" || status === "PAUSED") {
      return (
        <div className="box-score">{`${match.score.fullTime.homeTeam} -
      ${match.score.fullTime.awayTeam}`}</div>
      );
    } else if (status === "FINISHED") {
      return (
        <div className="final-score">
          FT
          <div className="final-box-score">{`${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`}</div>
        </div>
      );
    }
    return "vs";
  };
  filterUserPicks = (match) => {
    let isPicked = this.props.userPicks.find(
      (m) => m.match.match_id === match.id
    );

    return isPicked !== undefined ? true : false;
  };

  findWinnerName = (match) => {
    let winner = this.props.userPicks.find((m) => m.match.match_id === match.id)
      .winner;
    if (winner === "HOME_TEAM") {
      return removeFC(match.homeTeam.name);
    }
    return removeFC(match.awayTeam.name);
  };
  findPickScore = (match) => {
    let score = this.props.userPicks.find((m) => m.match.match_id === match.id);
    if (score.homeTeam && score.awayTeam) {
      return `${score.homeTeam} - ${score.awayTeam}`;
    } else return "No score added to pick";
  };

  render() {
    const { match } = this.props;
    const awayTeam = this.props.standings.find(
      (stand) => stand.team.id === match.awayTeam.id
    ).team.crestUrl;
    const homeTeam = this.props.standings.find(
      (stand) => stand.team.id === match.homeTeam.id
    ).team.crestUrl;

    return (
      <>
        <td id="home-team-td">
          <img src={homeTeam} alt="team crest" width="80px" /> <br />
          {removeFC(match.homeTeam.name)}{" "}
        </td>

        <td className="vs">{this.gameStatus(match.status, match)}</td>

        <td id="away-team-td">
          {" "}
          <img src={awayTeam} alt="team crest" width="80px" /> <br />
          {removeFC(match.awayTeam.name)}
        </td>
        <td>{moment(match.utcDate).format("LLLL")}</td>
        {this.props.user.id &&
        moment(match.utcDate).format("LLLL") > getTime() ? (
          <td>
            {this.state.isPicked ? (
              <>
                <Pick match={match} handlePick={this.handlePick} />
              </>
            ) : (
              <>
                {" "}
                {match.status === "IN_PLAY" ||
                match.status === "PAUSED" ||
                match.status === "FINISHED" ? null : (
                  <>
                    {" "}
                    {this.filterUserPicks(match) ? (
                      `Your pick: ${this.findWinnerName(
                        match
                      )}, Score: ${this.findPickScore(match)}`
                    ) : (
                      <button className="nav-buttons" onClick={this.handlePick}>
                        add pick
                      </button>
                    )}{" "}
                  </>
                )}
              </>
            )}
          </td>
        ) : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  // reducers
  return {
    user: state.user,
    standings: state.standings,
    userPicks: state.userPicks,
  };
}

//

export default connect(mapStateToProps)(MatchRow);
