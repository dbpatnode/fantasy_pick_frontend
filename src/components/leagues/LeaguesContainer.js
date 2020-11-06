import React from "react";
import AddLeague from "./AddLeagues";
import { connect } from "react-redux";
import api from "../../services/api";
import { setLeagues, addJoinToLeague } from "../../actions";

class LeaguesContainer extends React.Component {
  componentDidMount() {
    api.leagues.getLeagues().then((data) => {
      if (!data.error) {
        this.props.setLeagues(data);
      }
    });
  }
  handelJoinLeague = (league) => {
    let join = {
      user_id: this.props.user.id,
      league_id: league,
    };

    api.leagues.joinToLeague(join).then((data) => {
      if (!data.error || !data.message) {
        this.props.addJoinToLeague(data);
      }
    });
  };
  render() {
    console.log(this.props.leagues);
    return (
      <div className="league-container">
        {this.props.isUser ? <AddLeague /> : null}
        <div className="leagues-table">
          <table>
            {this.props.leagues ? (
              <>
                <thead>
                  <tr>
                    <th>League Name</th>
                    <th>Members</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.leagues.map((league) => (
                    <tr key={league.id}>
                      <td>{league.league_name}</td>
                      <td>{league.joins.length + 1}</td>
                      {""}
                      {this.props.isUser ? (
                        <td>
                          {league.user_id === this.props.user.id ? (
                            "Your League"
                          ) : (
                            <>
                              {league.joins.find(
                                (join) => join.user_id === this.props.user.id
                              ) ? (
                                "League Member"
                              ) : (
                                <button
                                  onClick={() =>
                                    this.handelJoinLeague(league.id)
                                  }
                                >
                                  {" "}
                                  Join {league.league_name}
                                </button>
                              )}
                            </>
                          )}
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </>
            ) : null}
          </table>
        </div>
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
    setLeagues(leagues) {
      dispatch(setLeagues(leagues));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaguesContainer);
