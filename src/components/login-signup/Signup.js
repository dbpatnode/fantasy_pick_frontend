import React from "react";
import { ModalBody } from "reactstrap";
import { capitalize } from "../../services/helpers";
import { send, user, password } from "../../services/svg-icons";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    password_confirmation: "",
  };

  handleChange = (event) => {
    let value = event.target.value;
    this.setState({ [event.target.name]: value });
  };

  render() {
    return (
      <>
        <ModalBody>
          <form  onSubmit={(e) => this.props.handleSignUp(e, this.state)}>
           
              <span>{user}</span>
            <input className="ui label"
            id= "username-input"
              type="text"
              onChange={this.handleChange}
              value={this.state.username}
              name="username"
              placeholder="username"
            ></input>
        
          
            <input className="ui label"
              id="email-input"
              type="text"
              onChange={this.handleChange}
              name="email"
              placeholder="Email"
              value={this.state.email}
            />
           
            <input className="ui label"
            id="password-input"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
              name="password"
              placeholder="Password"
            ></input>
            <input className="ui label"
          id ="password-c-input"
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
