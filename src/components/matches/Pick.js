import React from "react";
import { connect } from "react-redux";
import { addPick } from "../../actions";
import api from "../../services/api";
// import { InputGroup, InputGroupAddon, Input } from "reactstrap";

class Pick extends React.Component {
  state = {
    winner: "",
    showSubmitButton: false,
    hidePick: false,
    awayTeam: 0,
    homeTeam: 0,
  };
  handleSubmitPick = (match) => {
    let winner;
    if (this.state.homeTeam > this.state.awayTeam) {
      winner = match.homeTeam.name;
      this.setState({ ...this.state, winner: "HOME_TEAM" });
    } else if (this.state.awayTeam > this.state.homeTeam) {
      winner = match.awayTeam.name;
    } else if (this.state.awayTeam === this.state.homeTeam) {
      alert("You must pick a winner");
    }

    let pick = {
      winner: winner,
      match_id: match.id,
      user_id: this.props.user.id,
      match_day: match.matchday,
      homeTeam: this.state.homeTeam,
      awayTeam: this.state.awayTeam,
    };

    api.pick.addPick(pick).then((data) => {
      if (!data.error) {
        this.props.addPick(data);
        this.setState({
          showSubmitButton: false,
          hidePick: true,
        });
      } else {
        let error = data.error[0].split(" ").slice(1).join(" ");
        alert(error);
      }
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (e.target.value > 0) {
      this.setState({
        showSubmitButton: true,
      });
    }
  };
  // handleChange = (e) => {
  //   if (e.target.name !== "winner") {
  //     this.setState({
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  //   if (e.target.value !== 0) {
  //     this.setState({
  //       winner: e.target.value,
  //       showSubmitButton: true,
  //     });
  //   }
  // };
  findWinnerName = (match) => {
    return this.state.winner === "HOME_TEAM"
      ? match.homeTeam.name
      : match.awayTeam.name;
  };

  render() {
    const { match } = this.props;
    return (
      <>
        {!this.state.hidePick ? (
          <>
            <label className="score-input">{match.homeTeam.name}</label>{" "}
            <input
              name="homeTeam"
              min={0}
              value={this.state.homeTeam}
              type="number"
              onChange={this.handleChange}
            />
            <br />
            <label className="score-input">{match.awayTeam.name}</label>{" "}
            <input
              name="awayTeam"
              min={0}
              value={this.state.awayTeam}
              type="number"
              onChange={this.handleChange}
              className="score-input"
            />
            <br />
            {this.state.showSubmitButton ? (
              <button
                className="pick-button"
                onClick={() => this.handleSubmitPick(match)}
              >
                submit
              </button>
            ) : null}
            <button className="back-button" onClick={this.props.handlePick}>
              Back
            </button>
          </>
        ) : (
          `Your Winner:
          ${this.findWinnerName(match)}, Score: ${this.state.homeTeam} - ${
            this.state.awayTeam
          }`
        )}
      </>
    );
  }
  // render() {
  //   const { match } = this.props;
  //   return (
  //     <>
  //       {!this.state.hidePick ? (
  //         <>
  //           <select
  //             className="label-winner"
  //             name="winner"
  //             onChange={this.handleChange}
  //           >
  //             {this.state.showSubmitButton ? null : (
  //               <option name="winner" value="0">
  //                 Please Choose Winner From List{" "}
  //               </option>
  //             )}
  //             <option
  //               name={match.homeTeam.name}
  //               value={"HOME_TEAM"}
  //               id={match.homeTeam.name}
  //             >
  //               {match.homeTeam.name}
  //             </option>
  //             <option name={match.awayTeam.name} value={"AWAY_TEAM"}>
  //               {match.awayTeam.name}
  //             </option>
  //           </select>
  //           <br />
  //           <label className="score-input">{match.homeTeam.name}</label>{" "}
  //           <input
  //             name="homeTeam"
  //             min={0}
  //             value={this.state.homeTeam}
  //             type="number"
  //             onChange={this.handleChange}
  //           />
  //           <br />
  //           <label className="score-input">{match.awayTeam.name}</label>{" "}
  //           <input
  //             name="awayTeam"
  //             min={0}
  //             value={this.state.awayTeam}
  //             type="number"
  //             onChange={this.handleChange}
  //             className="score-input"
  //           />
  //           <br />
  //           {this.state.showSubmitButton ? (
  //             <button
  //               className="pick-button"
  //               onClick={() => this.handleSubmitPick(match)}
  //             >
  //               submit
  //             </button>
  //           ) : null}
  //           <button className="back-button" onClick={this.props.handlePick}>
  //             Back
  //           </button>
  //         </>
  //       ) : (
  //         `Your pick:
  //         ${this.findWinnerName(match)}`
  //       )}
  //     </>
  //   );
  // }
}

function mapStateToProps(state) {
  // reducers
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  // actions.js
  return {
    addPick: (pick) => dispatch(addPick(pick)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Pick);
