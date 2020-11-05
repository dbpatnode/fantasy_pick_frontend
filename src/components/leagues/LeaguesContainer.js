import React from "react";
import AddLeague from "./AddLeagues";
import { connect } from "react-redux";
import api from "../../services/api";
import { addJoinToLeague } from "../../actions";

class LeaguesContainer extends React.Component {
  handelJoinLeague = (league) => {
    let join = {
      user_id: this.props.user.id,
      league_id: league,
    };

    api.leagues.joinToLeague(join).then((data) => {
      if (!data.error) {
        this.props.addJoinToLeague(data);
      }
    });
  };
  render() {
    // need to change className after building the page
    return (
      <div className="standings-table">
        <AddLeague />
        {this.props.leagues
          ? this.props.leagues.map((league) => (
              <li key={league.id}>
                {league.league_name}
                {""}
                {this.props.isUser ? (
                  <button onClick={() => this.handelJoinLeague(league.id)}>
                    {" "}
                    Join {league.league_name}
                  </button>
                ) : null}
              </li>
            ))
          : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // reducers
  return {
    user: state.user,
    leagues: state.leagues,
    isUser: state.isUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addJoinToLeague(join) {
      dispatch(addJoinToLeague(join));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaguesContainer);
