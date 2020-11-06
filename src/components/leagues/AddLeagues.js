import React from "react";
import { connect } from "react-redux";
import { addLeague } from "../../actions";
import api from "../../services/api";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";

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
            <InputGroupText onClick={this.handleSubmit}>
              Add New League
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
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
