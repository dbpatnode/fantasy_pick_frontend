import { loss, draw, won } from "../../services/svg-icons";
import pic from "../../pic.png";

const StandingsTable = (props) => {
  return (
    <div className="standings-table">
      <img className="pic" width="600px" src={pic}></img>
      <div className="under-pic"></div>
      <table className="standings-D">
        <thead>
          <tr className="match-headers">
            <th></th>
            <th id="standings-club-D">Club</th>
            <th>Matches</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Points</th>
            <th>Last 5</th>
          </tr>
        </thead>
        <tbody>
          {props.standings
            ? props.standings.map((table) => (
                <tr className="standings-row-D">
                  <td id="standings-crest-td-D">
                    <span className="standings-position-D">
                      {table.position}
                    </span>
                    <img
                      src={table.team.crestUrl}
                      alt="team crest"
                      className="standings-crest-D"
                    ></img>
                  </td>
                  <td id="standings-club-D">{table.team.name}</td>
                  <td>{table.playedGames}</td>
                  <td>{table.won}</td>
                  <td>{table.draw}</td>
                  <td>{table.lost}</td>
                  <td>{table.points}</td>
                  <td>
                    {table.form.split(",").map((game) => (
                      <span>
                        {game === "W" ? (
                          <span className="Won">{won}</span>
                        ) : null}
                        {game === "L" ? (
                          <span className="Loss">{loss}</span>
                        ) : null}
                        {game === "D" ? (
                          <span className="Draw">{draw}</span>
                        ) : null}
                      </span>
                    ))}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};
export default StandingsTable;
