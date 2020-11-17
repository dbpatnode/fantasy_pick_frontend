import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { deleteLeague, updateLeagueName } from "../../actions";
import { InputGroup, InputGroupAddon, Input, ModalBody } from "reactstrap";

class EditDeleteLeague extends React.Component {
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

  handleDelete = (leagueId) => {
    api.leagues.deleteLeague(leagueId).then((data) => {
      if (!data.error) {
        this.props.deleteLeague(leagueId);
        this.props.history.push("/leagues");
      }
    });
  };

  render() {
    return (
      <ModalBody>
        <form onSubmit={(e) => this.handleSubmit(e, this.props.league.id)}>
          <InputGroup>
            <Input
              type="text"
              name="league_name"
              value={this.state.league_name}
              onChange={this.handleChange}
            />
            <InputGroupAddon addonType="append">
              <button
                className="edit-league-button"
                onClick={(e) => this.handleSubmit(e, this.props.league.id)}
              >
                Change Name
              </button>
            </InputGroupAddon>
          </InputGroup>
        </form>
        <button
          onClick={() => this.handleDelete(this.props.league.id)}
          className="delete-league-button"
        >
          {" "}
          Delete
        </button>
      </ModalBody>
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
    deleteLeague(league) {
      dispatch(deleteLeague(league));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditDeleteLeague));
