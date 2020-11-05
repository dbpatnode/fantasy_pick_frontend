import React from "react";
import { connect } from "react-redux";
import moment from "moment";

class MatchRow extends React.Component {
  handlePick = (match, user) => {};

  render() {
    const { match } = this.props;
    return (
      <>
        <td>{match.homeTeam.name} </td>
        <td>{match.awayTeam.name}</td>
        <td>{moment(match.utcDate).format("LLLL")}</td>
        {this.props.token ? (
          <td>
            <button onClick={() => this.handlePick(match, this.props.user)}>
              add pick
            </button>
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
