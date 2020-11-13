import React from "react";
import { findWinner, findClub, findMatch } from "../../services/helpers";

const PickRow = ({ p, matches, matchWeek }) => {
  console.log(p);
  return (
    <div>
      {p.match.matchday == matchWeek ? (
        <div>
          <td>
            {findMatch(p, "home", matches)} vs. {findMatch(p, "away", matches)}
          </td>
          <td>{findClub(p)}</td>
          {findMatch(p, "status", matches) == "FINISHED" ? (
            <td>{findWinner(p, matches) ? "Win" : "Lost"}</td>
          ) : (
            <td> No final Score yet </td>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default PickRow;
