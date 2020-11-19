import { render } from "@testing-library/react";
import React from "react";
import {
  findWinner,
  findClub,
  findMatch,
  findScore,
} from "../../services/helpers";
import { loss, draw, won } from "../../services/svg-icons";

class PickRow extends React.Component {
  render() {
    const { p, matchWeek, matches } = this.props;
    return (
      <div className="ui-cards">
        {matchWeek !== "all" ? (
          <>
            {p.match.matchday == matchWeek ? (
              <div className="card">
                <div className="content">
                  <b>
                    <span>
                      {" "}
                      {findMatch(p, "home", matches)} vs.{" "}
                      {findMatch(p, "away", matches)}
                    </span>
                  </b>
                  <br />

                  <span>Pick: </span>
                  {findClub(p)}
                  {findMatch(p, "status", matches) == "FINISHED" ? (
                    <div>
                      {findWinner(p, matches) ? <>{won}</> : <>{loss}</>}
                    </div>
                  ) : (
                    <div> No final Score yet </div>
                  )}
                  {p.homeTeam && p.awayTeam ? (
                    <>
                      <span>
                        Score: {p.homeTeam} - {p.awayTeam}
                      </span>
                      {findMatch(p, "status", matches) == "FINISHED" ? (
                        <div>
                          {findScore(p, matches) ? <>{won}</> : <>{loss}</>}
                        </div>
                      ) : (
                        <div> No final Score yet </div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            ) : null}{" "}
          </>
        ) : (
          <div className="card">
            <div className="content">
              <b>
                <span>
                  {" "}
                  {findMatch(p, "home", matches)} vs.{" "}
                  {findMatch(p, "away", matches)}
                </span>
              </b>
              <br />

              <span>Pick: </span>
              {findClub(p)}
              {findMatch(p, "status", matches) == "FINISHED" ? (
                <div>{findWinner(p, matches) ? <>{won}</> : <>{loss}</>}</div>
              ) : (
                <div> No final Score yet </div>
              )}
              {p.homeTeam && p.awayTeam ? (
                <>
                  <span>
                    Score: {p.homeTeam} - {p.awayTeam}
                  </span>
                  {findMatch(p, "status", matches) == "FINISHED" ? (
                    <div>
                      {findScore(p, matches) ? <>{won}</> : <>{loss}</>}
                    </div>
                  ) : (
                    <div> No final Score yet </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PickRow;
