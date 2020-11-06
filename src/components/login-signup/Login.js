import React from "react";
import { send } from "../../services/svg-icons";
import { ModalBody } from "reactstrap";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <>
        <ModalBody>
          <form onSubmit={(e) => this.props.handleLogin(e, this.state)}>
            <input
              autoComplete="on"
              onChange={this.handleChange}
              type="text"
              value={this.state.username}
              name="username"
              placeholder="username"
            ></input>
            <input
              onChange={this.handleChange}
              type="password"
              value={this.state.password}
              name="password"
              placeholder="Password"
            ></input>
            <button
              className="signin-button"
              onSubmit={(e) => this.props.handleLogin(e, this.state)}
            >
              {send}
            </button>
          </form>
        </ModalBody>
      </>
    );
  }
}

export default Login;
