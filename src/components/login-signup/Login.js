import React from "react";
import { send, user, password } from "../../services/svg-icons";
import { capitalize } from "../../services/helpers";
import { ModalBody } from "reactstrap";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    let value = event.target.value;
    this.setState({ [event.target.name]: value });
  };

  render() {
    return (
      <>
        <ModalBody>
          <form onSubmit={(e) => this.props.handleLogin(e, this.state)}>
            <div className="ui label">
              <span>{user}</span>
              <input
                className="ui label"
                autoComplete="on"
                onChange={this.handleChange}
                type="text"
                value={this.state.username}
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="ui label">
              {password}
              <input
                className="ui label"
                onChange={this.handleChange}
                type="password"
                value={this.state.password}
                name="password"
                placeholder="Password"
              ></input>
            </div>
            <span>
              <button
                className="signin-button"
                onSubmit={(e) => this.props.handleLogin(e, this.state)}
              >
                {send}
              </button>
            </span>
          </form>
        </ModalBody>
      </>
    );
  }
}

export default Login;
