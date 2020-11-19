import React from "react";
import { connect } from "react-redux";
import { addLeague } from "../../actions";
import api from "../../services/api";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { capitalize } from "../../services/helpers";

class AddLeague extends React.Component {
  state = {
    league: "",
  };

  handleChange = (e) => {
    let value = e.target.value;
    value = capitalize(value);

    this.setState({ league: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props.user.id);
    let league = {
      league_name: this.state.league,
      user_id: this.props.user.id,
    };

    api.leagues.addLeague(league).then((data) => {
      if (!data.error) {
        this.props.addLeague(data);
        this.setState({ league: "" });
      } else {
        alert(data.error);
      }
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <InputGroup>
            <Input
              onChange={this.handleChange}
              name="league"
              value={this.state.league}
              type="text"
              placeholder="League Name"
              required
            />
            <InputGroupAddon addonType="append">
              <button onClick={this.handleSubmit}>Add New League</button>
            </InputGroupAddon>
          </InputGroup>
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
