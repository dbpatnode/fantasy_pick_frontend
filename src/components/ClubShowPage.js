import React from "react";
import api from "../services/api";
import moment from "moment";

export default class ClubShowPage extends React.Component {
  state = {
    club: {},
  };
  componentDidMount() {
    api.teams.fetchTeam(this.props.team.id).then((data) => {
      if (!data.error) {
        this.setState({ club: data });
      }
    });
  }

  render() {
    console.log(this.props.team);

    const {
      name,
      clubColors,
      founded,
      phone,
      tla,
      venue,
      website,
      area,
      squad,
    } = this.state.club;
    console.log(squad);
    return (
      <div>
        <h1> {this.props.team.name}</h1>
        <img src={this.props.team.crestUrl} alt="team crest" />
        {this.state.club ? (
          <>
            <p>Club Colors: {clubColors}</p>
            <p>Venue: {venue}</p>
            <p>Founded: {founded}</p>
            <p>Phone: {phone}</p>
            <a href={website} target="_blank">
              {name} website
            </a>
            <h3> Squad</h3>
            <table>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Shirt No.</th>
                <th>Role</th>
                <th>Nationality</th>
                <th>Country Of Birth</th>
                <th>Date Of Birth</th>
              </tr>
              {squad
                ? squad.map((s) => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.position}</td>
                      <td>{s.shirtNumber}</td>
                      <td>{s.role}</td>
                      <td>{s.nationality}</td>
                      <td>{s.countryOfBirth}</td>
                      <td>{moment(s.dateOfBirth).format("MMM Do YYYY")}</td>
                    </tr>
                  ))
                : null}
            </table>
          </>
        ) : null}
      </div>
    );
  }
}
