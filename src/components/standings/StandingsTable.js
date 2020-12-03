import { loss, draw, won } from "../../services/svg-icons";
import pic from "../../pic.png";
// import { Collapse } from "reactstrap";

const StandingsTable = (props) => {
  return (
    <div className="page-container">
      <h1 id="welcome-message">
        Premier League Pick'em<br></br>
        <p className="under-message">Pick Matches. Compete. Win Leagues.</p>
      </h1>
      <iframe
        src="https://www.youtube.com/embed/pS6AHsNRW5A?autoplay=1&mute=1"
        className="youtube"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />

      <img className="pic" width="600px" src={pic} alt="club-crest"></img>
      <div className="standings-table">
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
                  <tr
                    className="standings-row-D"
                    key={`standing${table.position}`}
                  >
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
                      {table.form.split(",").map((game, index) => (
                        <span key={`${game}${index}`}>
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
    </div>
  );
};
export default StandingsTable;
