import React from "react";
import { connect } from "react-redux";
import { addPick } from "../../actions";
import api from "../../services/api";

class Pick extends React.Component {
  state = {
    winner: "",
    showSubmitButton: false,
    hidePick: false,
  };
  handleSubmitPick = (match) => {
    let pick = {
      winner: this.state.winner,
      match_id: match.id,
      user_id: this.props.user.id,
      match_day: match.matchday,
    };
    api.pick.addPick(pick).then((data) => {
      if (!data.error) {
        this.props.addPick(data);
        this.setState({
          winner: "",
          showSubmitButton: false,
          hidePick: true,
        });
      }
    });
  };
  handleChange = (e) => {
    if (e.target.value !== 0) {
      this.setState({
        winner: e.target.value,
        showSubmitButton: true,
      });
    }
  };

  render() {
    const { match } = this.props;
    return (
      <>
        {!this.state.hidePick ? (
          <>
            <select name="winner" onChange={this.handleChange}>
              {this.state.showSubmitButton ? null : (
                <option name="winner" value="0">
                  Please Choose Winner From List{" "}
                </option>
              )}
              <option name={match.homeTeam.name} value={match.homeTeam.name}>
                {match.homeTeam.name}
              </option>
              <option name={match.awayTeam.name} value={match.awayTeam.name}>
                {match.awayTeam.name}
              </option>
            </select>
            {this.state.showSubmitButton ? (
              <button onClick={() => this.handleSubmitPick(match)}>
                submit
              </button>
            ) : null}
            <br />
            <button onClick={this.props.handlePick}>Back</button>
          </>
        ) : (
          "Already picked"
        )}
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

function mapDispatchToProps(dispatch) {
  // actions.js
  return {
    addPick: (pick) => dispatch(addPick(pick)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Pick);
