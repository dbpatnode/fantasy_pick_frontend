import React from "react";
import { findWinner, findClub, findMatch } from "../../services/helpers";

const PickRow = ({ p, matches, matchWeek }) => {
  // debugger;
  console.log(matches);
  return (
    <>
      {/* {p.match.matchday == matchWeek ? ( */}

      <td>
        {findMatch(p, "home", matches)} vs. {findMatch(p, "away", matches)}
      </td>
      <td>{findClub(p)}</td>
      {findMatch(p, "status", matches) == "FINISHED" ? (
        <td>{findWinner(p, matches) ? "Win" : "Lost"}</td>
      ) : (
        <td> No final Score yet </td>
      )}

      {/* ) : null} */}
    </>
  );
};

export default PickRow;
