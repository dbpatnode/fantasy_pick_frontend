import { render } from "@testing-library/react";
import React from "react";
import { findWinner, findClub, findMatch } from "../../services/helpers";
import { loss, draw, won } from "../../services/svg-icons";
class PickRow extends React.Component {
  // debugger;

  render() {
  return (
    
    <div className="ui-cards">
      {this.props.p.match.matchday == this.props.matchWeek ? (
        <div className="card">
          <div className="content">
           <b><span> {findMatch(this.props.p, "home", this.props.matches)} vs. {findMatch(this.props.p, "away", this.props.matches)}</span></b><br />
         
          <span>Pick: </span>{findClub(this.props.p)}
          {findMatch(this.props.p, "status", this.props.matches) == "FINISHED" ? (
            <div>{findWinner(this.props.p, this.props.matches) ? ({won}) : ({loss}) }</div>
          ) : (
            <div> No final Score yet </div>
          )}
          </div>
        </div>
      ) : null}
    </div>

  );
          }
};

export default PickRow;
