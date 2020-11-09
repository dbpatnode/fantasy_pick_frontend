import React from "react";
import { findWinner, findClub, findMatch } from "../../services/helpers";

const PickRow = ({ p, matches }) => {
  return (
    <>
      <td>
        {findMatch(p, "home", matches)} vs. {findMatch(p, "away", matches)}
      </td>
      <td>{findClub(p)}</td>
      {findMatch(p, "status", matches) == "FINISHED" ? (
        <td>{findWinner(p, matches) ? "Win" : "Lost"}</td>
      ) : (
        <td> No final Score yet </td>
      )}
    </>
  );
};

export default PickRow;
