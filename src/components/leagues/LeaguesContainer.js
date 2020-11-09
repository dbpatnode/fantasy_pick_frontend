import React from "react";
import { Link } from "react-router-dom";
import AddLeague from "./AddLeagues";
import { connect } from "react-redux";
import api from "../../services/api";
import { sortBy } from "../../services/helpers";
import { setLeagues } from "../../actions";

import JoinLeague from "./JoinLeague";

class LeaguesContainer extends React.Component {
  componentDidMount() {
    api.leagues.getLeagues().then((data) => {
      if (!data.error) {
        this.props.setLeagues(data);
      }
    });
  }

  render() {
    const { leagues, isUser, user } = this.props;
    console.log(leagues);
    console.log(user.id);
    return (
      <div className="league-container">
        {isUser ? <AddLeague /> : null}
        <div className="leagues-table">
          <table>
            {leagues ? (
              <>
                <thead>
                  <tr>
                    <th>League Name</th>
                    <th>Members</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortBy(leagues).map((league) => (
                    <tr key={league.id}>
                      <td>
                        <Link to={`/leagues/${league.id}`}>
                          {league.league_name}
                        </Link>
                      </td>
                      <td>{league.join.length}</td>
                      {isUser ? (
                        <td>
                          {league.user_id === user.id ? (
                            "Your League"
                          ) : (
                            <>
                              {league.join.find(
                                (join) => join.user_id === user.id
                              ) ? (
                                "League Member"
                              ) : (
                                <JoinLeague league={league} />
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
    userLeagues: state.userLeagues,
    isUser: state.isUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLeagues(leagues) {
      dispatch(setLeagues(leagues));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaguesContainer);
