import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import api from "../../services/api";
import { addJoinToLeague } from "../../actions";

class JoinLeague extends React.Component {
  handelJoinLeague = (league) => {
    let join = {
      user_id: this.props.user.id,
      league_id: league,
    };

    api.leagues.joinToLeague(join).then((data) => {
      if (!data.error) {
        this.props.addJoinToLeague(data);
      } else {
        alert(data.error);
      }
    });
  };

  render() {
    return (
      <button onClick={() => this.handelJoinLeague(this.props.league.id)}>
        Join {this.props.league.league_name}
      </button>
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
    addJoinToLeague(join) {
      dispatch(addJoinToLeague(join));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinLeague);
