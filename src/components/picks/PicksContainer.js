import React, { Component } from "react";
import { connect } from "react-redux";

import { sortByPick } from "../../services/helpers";
import PickRow from "./PickRow";

class PicksContainer extends Component {
  render() {
    const { matches, picks } = this.props;
    console.log(this.props.picks);
    return (
      <div className="league-container">
        <div className="leagues-table">
          <table className="picks-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Match</th>
                <th>Pick</th>
                <th>Status</th>
                <th>User Points</th>
              </tr>
            </thead>
            <tbody>
              {sortByPick(picks).map((p) => (
                <tr key={p.id}>
                  <td>{p.user.username} </td>
                  <PickRow p={p} matches={matches} matchWeek="all" />
                  <td>{p.user.wins} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    picks: state.picks,
    matches: state.matches,
    currentMatchWeek: state.currentMatchWeek,
  };
}

export default connect(mapStateToProps)(PicksContainer);
