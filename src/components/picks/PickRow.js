import React from "react";
import { findWinner, findClub, findMatch } from "../../services/helpers";
import { loss, draw, won } from "../../services/svg-icons";
const PickRow = ({ p, matches, matchWeek }) => {
  console.log(p);
  return (
    <div className="ui-cards">
      {p.match.matchday == matchWeek ? (
        <div className="card">
          <div className="content">
           <b><span> {findMatch(p, "home", matches)} vs. {findMatch(p, "away", matches)}</span></b><br />
         
          <span>Pick: </span>{findClub(p)}
          {findMatch(p, "status", matches) == "FINISHED" ? (
            <div>{findWinner(p, matches) ? ({won}) : ({loss}) }</div>
          ) : (
            <div> No final Score yet </div>
          )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PickRow;
