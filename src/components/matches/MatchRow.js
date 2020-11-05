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

  render() {
    console.log(this.props.match);
    const { match } = this.props;
    const awayTeam = this.props.standings.find(
      (stand) => stand.team.id === match.awayTeam.id
    ).team.crestUrl;
    const homeTeam = this.props.standings.find(
      (stand) => stand.team.id === match.homeTeam.id
    ).team.crestUrl;
    console.log(getTime());
    return (
      <>
        <td>
          <img src={homeTeam} alt="team crest" width="100px" /> <br />
          {match.homeTeam.name}{" "}
        </td>
        <td>
          {" "}
          <img src={awayTeam} alt="team crest" width="100px" /> <br />
          {match.awayTeam.name}
        </td>
        <td>{moment(match.utcDate).format("LLLL")}</td>
        {this.props.token &&
        moment(match.utcDate).subtract(1, "days") > getTime() ? (
          <td>
            {this.state.isPicked ? (
              <>
                <Pick match={match} handlePick={this.handlePick} />
              </>
            ) : (
              <button onClick={this.handlePick}>add pick</button>
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
