import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Pick from "./Pick";

class MatchRow extends React.Component {
  state = {
    isPicked: false,
  };
  handlePick = () => {
    this.setState({ isPicked: !this.state.isPicked });
  };

  render() {
    const { match } = this.props;
    return (
      <>
        <td>{match.homeTeam.name} </td>
        <td>{match.awayTeam.name}</td>
        <td>{moment(match.utcDate).format("LLLL")}</td>
        {this.props.token ? (
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
  };
}

//

export default connect(mapStateToProps)(MatchRow);
