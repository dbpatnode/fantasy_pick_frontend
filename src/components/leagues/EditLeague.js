import React from "react";
import { connect } from "react-redux";
import api from "../../services/api";
import { updateLeagueName } from "../../actions";

class EditLeague extends React.Component {
  state = {
    isEdit: false,
    league_name: "",
  };
  handelEditLeague = () => {
    this.setState({ isEdit: true, league_name: this.props.league.league_name });
  };

  handleChange = (e) => {
    this.setState({ ...this.state, league_name: e.target.value });
  };
  handleSubmit = (e, leagueId) => {
    e.preventDefault();
    let leagueToUpdate = { league_name: this.state.league_name };
    api.leagues.updateLeague(leagueId, leagueToUpdate).then((data) => {
      if (!data.error) {
        this.setState({ isEdit: false, league_name: "" });
        this.props.updateLeagueName(data);
        console.log(data);
      }
    });
  };

  render() {
    return (
      <>
        {!this.state.isEdit ? (
          <button onClick={() => this.handelEditLeague(this.props.league.id)}>
            Edit League Name
          </button>
        ) : (
          <form onSubmit={(e) => this.handleSubmit(e, this.props.league.id)}>
            <input
              type="text"
              name="league_name"
              value={this.state.league_name}
              onChange={this.handleChange}
            />
          </form>
        )}{" "}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLeagueName(league) {
      dispatch(updateLeagueName(league));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLeague);
