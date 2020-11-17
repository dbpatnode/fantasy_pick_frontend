import React from "react";
import { Link } from "react-router-dom";
import AddLeague from "./AddLeagues";
import { connect } from "react-redux";
import api from "../../services/api";
import { sortByJoins } from "../../services/helpers";
import { setLeagues } from "../../actions";

import JoinLeague from "./JoinLeague";

class LeaguesContainer extends React.Component {
  componentDidMount() {
    // api.leagues.getLeagues().then((data) => {
    //   if (!data.error) {
    //     this.props.setLeagues(data);
    //   }
    // });
  }
  findIfOwnerOrMember = (league, id) => {
    if (league.user.id === id) {
      return "Your League";
    } else {
      let joined = league.join.find((user) => user.user.id === id);
      if (joined) {
        return "you're already a league member";
      }
    }
    return this.renderJoin(league);
  };

  renderJoin = (league) => <JoinLeague league={league} />;

  render() {
    const { leagues, isUser, user } = this.props;

    return (
      <div className="page-container">
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
                  {leagues ? (
                    <tbody>
                      {sortByJoins(leagues).map((league) => (
                        <tr key={league.id}>
                          <td>
                            <Link to={`/leagues/${league.id}`}>
                              {league.league_name}
                            </Link>
                          </td>
                          
                          <td className="statistic"> {league.join.length} Members</td>
                          {isUser
                            ? this.findIfOwnerOrMember(league, user.id)
                            : null}
                        </tr>
                      ))}
                    </tbody>
                  ) : null}
                </>
              ) : null}
            </table>
          </div>
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
