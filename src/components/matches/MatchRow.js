import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Pick from "./Pick";
import { getTime } from "../../services/helpers";

class MatchRow extends React.Component {
  state = {
    isPicked: false,
  };
  handlePick = () => {
    this.setState({ isPicked: !this.state.isPicked });
  };

  gameStatus = (status, match) => {
    if (status === "IN_PLAY" || status === "PAUSED") {
      return `Game in Progress ${match.score.fullTime.homeTeam} -
      ${match.score.fullTime.awayTeam}`;
    } else if (status === "FINISHED") {
      return `Final Score ${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`;
    }
    return "vs";
  };

  render() {
    const { match } = this.props;
    const awayTeam = this.props.standings.find(
      (stand) => stand.team.id === match.awayTeam.id
    ).team.crestUrl;
    const homeTeam = this.props.standings.find(
      (stand) => stand.team.id === match.homeTeam.id
    ).team.crestUrl;

    console.log(match);
    return (
      <>
        <td id="home-team-td">
          <img src={homeTeam} alt="team crest" width="80px" /> <br />
          {match.homeTeam.name}{" "}
        </td>

        <td className="vs">{this.gameStatus(match.status, match)}</td>

        <td id="away-team-td">
          {" "}
          <img src={awayTeam} alt="team crest" width="80px" /> <br />
          {match.awayTeam.name}
        </td>
        <td>{moment(match.utcDate).format("LLLL")}</td>
        {this.props.token &&
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
                  <button className="nav-buttons" onClick={this.handlePick}>
                    add pick
                  </button>
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
    token: state.token,
    standings: state.standings,
  };
}

//

export default connect(mapStateToProps)(MatchRow);
