import React from "react";
import { connect } from "react-redux"


class Profile extends React.Component {
  render() {
    return (
      <>
      DIV
      </>
    );
  }
}
function mapStateToProps(state) {
  // reducers
  return {
    matches: state.matches,
    user: state.user,
    token: state.token,
  };
}

export default connect(mapStateToProps)(Profile);