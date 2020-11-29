import React from "react";
import { connect } from "react-redux";
import api from "../../services/api";
import { addJoinToLeague } from "../../actions";

class JoinLeague extends React.Component {
  state = {
    isJoined: false,
  };
  handelJoinLeague = (league) => {
    let join = {
      user_id: this.props.user.id,
      league_id: league,
    };

    api.leagues.joinToLeague(join).then((data) => {
      if (!data.error) {
        this.props.addJoinToLeague(data);
        this.setState({ isJoined: true });
      } else {
        alert(data.error);
      }
    });
  };

  render() {
    return (
      <>
        {this.state.isJoined ? null : (
          <button
            className="button-join-league"
            onClick={() => this.handelJoinLeague(this.props.league.id)}
          >
            Join {this.props.league.league_name}
          </button>
        )}
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
    addJoinToLeague(join) {
      dispatch(addJoinToLeague(join));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinLeague);
