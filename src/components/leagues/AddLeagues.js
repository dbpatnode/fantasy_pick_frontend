import React from "react";
import { connect } from "react-redux";
import { addLeague } from "../../actions";
import api from "../../services/api";

class AddLeague extends React.Component {
  state = {
    league: "",
  };

  handleChange = (e) => {
    this.setState({ league: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let league = {
      league_name: this.state.league,
      user_id: this.props.user.id,
    };
    console.log(league);
    api.leagues.addLeague(league).then((data) => {
      if (!data.error) {
        this.props.addLeague(data);
        this.setState({ league: "" });
      }
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>Add League</label>
          <br />
          <input
            onChange={this.handleChange}
            name="league"
            value={this.state.league}
            type="text"
            placeholder="League Name"
            required
          />
          <button>Submit</button>
        </form>
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
  // actions.js
  return {
    addLeague: (league) => dispatch(addLeague(league)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddLeague);
