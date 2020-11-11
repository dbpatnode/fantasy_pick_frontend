import React from "react";
import { ModalBody } from "reactstrap";
import { capitalize } from "../../services/helpers";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    password_confirmation: "",
  };

  handleChange = (event) => {
    let value = event.target.value;
    if (event.target.name === "username") {
      value = capitalize(value);
    }
    this.setState({ [event.target.name]: value });
  };

  render() {
    return (
      <>
        <ModalBody>
          <form onSubmit={(e) => this.props.handleSignUp(e, this.state)}>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.username}
              name="username"
              placeholder="username"
            ></input>
            <input
              type="text"
              onChange={this.handleChange}
              name="email"
              placeholder="Email"
              value={this.state.email}
            />
            <input
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
              name="password"
              placeholder="Password"
            ></input>
            <input
              type="password"
              onChange={this.handleChange}
              name="password_confirmation"
              placeholder="Password Confirmation"
              value={this.state.password_confirmation}
            />
            <br />
            <button
              color="primary"
              onClick={(e) => this.props.handleSignUp(e, this.state)}
            >
              Create an Account
            </button>{" "}
          </form>
        </ModalBody>
      </>
    );
  }
}
export default Signup;
